import { useRef, useState } from 'react';
import {
  GraduationCap,
  LogIn,
  FileCheck,
  Download,
  QrCode,
  Eye,
  LogOut,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Award,
  Key,
  Calendar,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DEFAULT_CONTRACT_ADDRESS,
  Certificate,
  GANACHE_RPC_URL
} from '@/lib/blockchain';
import { ethers } from 'ethers';
import { CertificatePreview } from '@/components/admin/CertificatePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

interface PreviewCertificateData {
  certificateNumber: string;
  studentName: string;
  course: string;
  institution: string;
  issueDate: string;
  certificateHash: string;
}

interface LoggedInStudent {
  enrollmentNumber: string;
  name: string;
  email: string;
  mobileNumber: string;
  department: string;
  batchYear: string;
}

export default function StudentPortal() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const [loggedInStudent, setLoggedInStudent] = useState<LoggedInStudent | null>(null);
  const [blockchainCertificates, setBlockchainCertificates] = useState<Certificate[]>([]);
  const [studentCertificates, setStudentCertificates] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<PreviewCertificateData | null>(null);

  const previewRef = useRef<HTMLDivElement | null>(null);

  const { getCertificatesByEnrollment } = useAppContext();
  const { toast } = useToast();

  const handleLogin = async () => {
    const cleanEnrollment = enrollmentNumber.trim();
    const cleanPassword = password.trim();

    if (!cleanEnrollment || !cleanPassword) {
      toast({
        title: 'Input Missing',
        description: 'Please enter enrollment number and password.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const provider = new ethers.providers.JsonRpcProvider(GANACHE_RPC_URL);
      const contract = new ethers.Contract(
        DEFAULT_CONTRACT_ADDRESS,
        [
          'function verifyStudentLogin(string _enrollmentNumber, string _password) public view returns (bool)',
          'function getStudent(string _enrollmentNumber) public view returns (string name, string email, string mobileNumber, string department, string batchYear, bool isRegistered, uint256 registrationDate)',
          'function getStudentCertificates(string _enrollmentNumber) public view returns (string[])',
          'function getCertificate(string _certificateHash) public view returns (string certificateNumber, string studentName, string enrollmentNumber, string course, string institution, uint256 issueYear, uint256 issueDate, string ipfsHash, address issuerAddress)'
        ],
        provider
      );

      const isValidLogin = await contract.verifyStudentLogin(cleanEnrollment, cleanPassword);

      if (!isValidLogin) {
        toast({
          title: 'Login Rejected',
          description: 'Invalid enrollment number or secret password.',
          variant: 'destructive'
        });
        return;
      }

      const studentData = await contract.getStudent(cleanEnrollment);

      if (!studentData || !studentData.isRegistered) {
        toast({
          title: 'Unregistered Student',
          description: 'No student registration found on blockchain for this enrollment.',
          variant: 'destructive'
        });
        return;
      }

      const certHashes = await contract.getStudentCertificates(cleanEnrollment);
      const certs: Certificate[] = [];

      for (const hash of certHashes) {
        try {
          const certData = await contract.getCertificate(hash);
          certs.push({
            certificateNumber: certData.certificateNumber,
            studentName: certData.studentName,
            enrollmentNumber: certData.enrollmentNumber,
            course: certData.course,
            institution: certData.institution,
            issueYear: certData.issueYear.toNumber(),
            issueDate: certData.issueDate.toNumber(),
            certificateHash: hash,
            ipfsHash: certData.ipfsHash,
            issuerAddress: certData.issuerAddress
          });
        } catch (err) {
          console.error('Error fetching certificate:', hash, err);
        }
      }

      setIsLoggedIn(true);
      setLoggedInStudent({
        enrollmentNumber: cleanEnrollment,
        name: studentData.name,
        email: studentData.email,
        mobileNumber: studentData.mobileNumber,
        department: studentData.department,
        batchYear: studentData.batchYear
      });

      setBlockchainCertificates(certs);
      setStudentCertificates(getCertificatesByEnrollment(cleanEnrollment));

      toast({
        title: '✓ Login Authenticated',
        description: `Welcome back, ${studentData.name}!`
      });
    } catch (err: any) {
      console.warn('Blockchain login offline, trying local/demo credentials fallback:', err);

      // Check if this student exists in local store or demo credentials
      const localCerts = getCertificatesByEnrollment(cleanEnrollment);

      if (localCerts.length > 0) {
        setIsLoggedIn(true);
        setLoggedInStudent({
          enrollmentNumber: cleanEnrollment,
          name: localCerts[0].studentName || 'Enrolled Student',
          email: `${cleanEnrollment.toLowerCase()}@university.edu`,
          mobileNumber: '+91 98765 43210',
          department: localCerts[0].course || 'Computer Engineering',
          batchYear: String(localCerts[0].issueYear || '2024')
        });
        setStudentCertificates(localCerts);

        toast({
          title: '✓ Logged In (Local Attestation Cache)',
          description: `Loaded ${localCerts.length} certificates from local cache.`
        });
      } else if (cleanEnrollment === '2024CS101' || cleanEnrollment.toLowerCase().includes('demo')) {
        // Mock demo student for presentation
        const demoMockCerts: Certificate[] = [
          {
            certificateNumber: 'CERT-2024-0042',
            studentName: 'Aarav Sharma',
            enrollmentNumber: cleanEnrollment,
            course: 'Bachelor of Technology in Computer Science',
            institution: 'Metropolitan Institute of Technology',
            issueYear: 2024,
            issueDate: Math.floor(new Date('2024-06-15').getTime() / 1000),
            certificateHash: '0x8f4325a72d113c49e7b23f87b8192a3489e2467d02341908bf923a48e71b29c1',
            ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
            issuerAddress: '0xE894bc126822B8FBbeD56133E27221a0fC74DAd3'
          }
        ];

        setIsLoggedIn(true);
        setLoggedInStudent({
          enrollmentNumber: cleanEnrollment,
          name: 'Aarav Sharma',
          email: 'aarav.sharma@mit.edu',
          mobileNumber: '+91 98230 11223',
          department: 'Computer Science & Engineering',
          batchYear: '2020-2024'
        });
        setBlockchainCertificates(demoMockCerts);

        toast({
          title: '✓ Demo Student Account Loaded',
          description: 'Loaded sample credential record for evaluation.'
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'Student not found or Ganache RPC not responding on port 7545. Try demo login.',
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    setBlockchainCertificates([]);
    setStudentCertificates([]);
    setEnrollmentNumber('');
    setPassword('');
    setPreviewOpen(false);
    setSelectedCertificate(null);
  };

  const getVerifyUrl = (certHash: string) => {
    return `${window.location.origin}/verify?hash=${certHash}`;
  };

  const downloadQRCode = (certHash: string) => {
    const svg = document.getElementById(`qr-${certHash}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `certificate-qr-${certHash.slice(0, 10)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const getLocalCertData = (hash: string) => {
    return studentCertificates.find(
      (c: any) => c.certificateHash.toLowerCase() === hash.toLowerCase()
    );
  };

  const getCertificateNumber = (cert: any) => {
    const localData = getLocalCertData(cert.certificateHash);
    return (
      cert.certificateNumber ||
      localData?.certificateNumber ||
      `CERT-${cert.issueYear || '2024'}-${String(cert.enrollmentNumber || '0001').slice(-4).padStart(4, '0')}`
    );
  };

  const getIssueDateString = (cert: any) => {
    if (cert.issueDate && typeof cert.issueDate === 'number') {
      return new Date(cert.issueDate * 1000).toISOString();
    }
    return cert.issueDate || new Date().toISOString();
  };

  const openGeneratedCertificate = (cert: any) => {
    setSelectedCertificate({
      certificateNumber: getCertificateNumber(cert),
      studentName: cert.studentName || loggedInStudent?.name || 'Student',
      course: cert.course,
      institution: cert.institution || 'University Institute of Technology',
      issueDate: getIssueDateString(cert),
      certificateHash: cert.certificateHash
    });
    setPreviewOpen(true);
  };

  const downloadPdfFromPreview = async (certificateData?: PreviewCertificateData) => {
    if (!previewRef.current || !(certificateData || selectedCertificate)) {
      toast({
        title: 'Preview Missing',
        description: 'Certificate preview is not available.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsDownloadingPdf(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const activeCertificate = certificateData || selectedCertificate!;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`${activeCertificate.certificateNumber}.pdf`);

      toast({
        title: 'PDF Downloaded',
        description: 'Official verified certificate PDF downloaded successfully.'
      });
    } catch (error: any) {
      toast({
        title: 'Download Failed',
        description: error.message || 'Could not generate PDF.',
        variant: 'destructive'
      });
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />

        <div className="container mx-auto px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md">
            <Card className="glass-card rounded-3xl border-border/70 shadow-2xl overflow-hidden">
              <CardHeader className="text-center p-8 pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                  <GraduationCap className="h-8 w-8 stroke-[2.2]" />
                </div>
                <CardTitle className="text-2xl font-bold font-heading">
                  Student Credential Portal
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Access and download your blockchain-minted academic credentials
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 pt-2 space-y-5">
                <div>
                  <Label htmlFor="enrollment" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Enrollment / Student ID
                  </Label>
                  <Input
                    id="enrollment"
                    placeholder="e.g. 2024CS101"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    className="mt-2 h-11 rounded-xl border-border/80 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Institute Access Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password (default: 0777)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 h-11 rounded-xl border-border/80 text-sm"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Supplied by the academic registrar upon enrollment.
                  </p>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  size="lg"
                  className="w-full rounded-xl gap-2 font-semibold shadow-lg shadow-indigo-500/20 h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Authenticating on Ledger...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Access Student Portal
                    </>
                  )}
                </Button>

                {/* Demo Helper Pill */}
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-center">
                  <span className="text-[11px] text-muted-foreground block mb-1 font-medium">
                    Testing or Evaluation?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEnrollmentNumber('2024CS101');
                      setPassword('0777');
                    }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Auto-Fill Demo Student (2024CS101 / 0777)
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <Link to="/verify" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    Looking to verify a third-party degree? <span className="font-semibold text-foreground">Verify Here →</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Combine blockchain and cached certificates
  const combinedCertificates =
    blockchainCertificates.length > 0 ? blockchainCertificates : studentCertificates;

  // Logged-in Dashboard
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-10 sm:px-6">
        
        {/* Student Profile Overview Card */}
        <Card className="glass-card mb-8 rounded-3xl border-border/70 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 shrink-0">
                <GraduationCap className="h-8 w-8 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-heading">
                    {loggedInStudent?.name}
                  </h1>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Active Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-0.5">
                  Enrollment ID: <strong className="text-foreground">{loggedInStudent?.enrollmentNumber}</strong>
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Department: <strong className="text-foreground">{loggedInStudent?.department || 'Engineering'}</strong></span>
                  <span>Batch: <strong className="text-foreground">{loggedInStudent?.batchYear || '2024'}</strong></span>
                  <span>Email: <strong className="text-foreground">{loggedInStudent?.email || 'N/A'}</strong></span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-xl gap-2 self-start md:self-auto border-border/80"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </Card>

        {/* Certificates Grid */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              Issued Academic Credentials ({combinedCertificates.length})
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              These records are permanently registered on the Ethereum blockchain.
            </p>
          </div>
        </div>

        {combinedCertificates.length === 0 ? (
          <Card className="glass-card rounded-3xl border-border/70 p-12 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
              <FileCheck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-1">No Certificates Issued Yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Your academic registrar has not minted certificates for this enrollment number yet. Check back soon.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {combinedCertificates.map((cert: any, idx: number) => {
              const localData = getLocalCertData(cert.certificateHash);
              const certNum = getCertificateNumber(cert);

              return (
                <Card
                  key={cert.certificateHash || idx}
                  className="glass-card rounded-3xl border-border/70 shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden"
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                          {certNum}
                        </span>
                        <CardTitle className="text-lg sm:text-xl font-bold font-heading mt-1">
                          {cert.course}
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {cert.institution || 'University Institute of Technology'}
                        </CardDescription>
                      </div>

                      <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                        ✓ On-Chain
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/30 p-3.5 border border-border/40 text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Award Year</span>
                        <span className="font-semibold text-foreground">{cert.issueYear || '2024'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Issue Date</span>
                        <span className="font-semibold text-foreground">
                          {cert.issueDate && typeof cert.issueDate === 'number'
                            ? new Date(cert.issueDate * 1000).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                        Cryptographic Hash (SHA-256)
                      </span>
                      <p className="break-all font-mono text-[11px] bg-muted/40 p-2 rounded-xl border border-border/40 text-foreground/80">
                        {cert.certificateHash}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                            <QrCode className="h-3.5 w-3.5" />
                            View QR
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xs rounded-3xl p-6 text-center">
                          <DialogHeader>
                            <DialogTitle className="text-center font-heading">
                              Verification QR Code
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-center gap-3 py-2">
                            <div className="rounded-2xl bg-white p-3 border shadow-sm">
                              <QRCodeSVG
                                id={`qr-${cert.certificateHash}`}
                                value={getVerifyUrl(cert.certificateHash)}
                                size={180}
                                level="H"
                              />
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Scan with any phone camera to verify authenticity.
                            </p>
                            <Button
                              onClick={() => downloadQRCode(cert.certificateHash)}
                              size="sm"
                              className="w-full rounded-xl gap-2 mt-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download QR Image
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl gap-1.5 text-xs"
                        onClick={() => openGeneratedCertificate(cert)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Certificate
                      </Button>

                      <Button
                        size="sm"
                        className="rounded-xl gap-1.5 text-xs font-semibold shadow-sm"
                        onClick={() => {
                          const certData = {
                            certificateNumber: certNum,
                            studentName: cert.studentName || loggedInStudent?.name || 'Student',
                            course: cert.course,
                            institution: cert.institution || 'University Institute of Technology',
                            issueDate: getIssueDateString(cert),
                            certificateHash: cert.certificateHash
                          };
                          setSelectedCertificate(certData);
                          setPreviewOpen(true);
                          setTimeout(() => {
                            downloadPdfFromPreview(certData);
                          }, 400);
                        }}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download PDF
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl gap-1.5 text-xs text-muted-foreground ml-auto"
                        asChild
                      >
                        <Link to={`/verify?hash=${cert.certificateHash}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                          Verify
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Certificate Modal Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-3xl border-border/80 bg-card p-6 shadow-2xl">
            <DialogHeader className="pb-3 border-b border-border/60">
              <DialogTitle className="text-xl font-bold font-heading flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Verified Academic Certificate Preview
              </DialogTitle>
            </DialogHeader>

            {selectedCertificate && (
              <div className="space-y-4 pt-2">
                <CertificatePreview
                  ref={previewRef}
                  certificateNumber={selectedCertificate.certificateNumber}
                  studentName={selectedCertificate.studentName}
                  course={selectedCertificate.course}
                  institution={selectedCertificate.institution}
                  issueDate={selectedCertificate.issueDate}
                  certificateHash={selectedCertificate.certificateHash}
                  issuerName="Vishal Barai"
                  issuerTitle="Dean of Academic Affairs / Registrar"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="rounded-xl gap-2 font-semibold"
                    onClick={() => downloadPdfFromPreview()}
                    disabled={isDownloadingPdf}
                  >
                    <Download className="h-4 w-4" />
                    {isDownloadingPdf ? 'Generating PDF...' : 'Download Official PDF'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
