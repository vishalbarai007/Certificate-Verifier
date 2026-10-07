import { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  Wallet,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  FileCheck,
  List,
  LogOut,
  Users,
  Files,
  RefreshCw,
  Search,
  Copy,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
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
import { useBlockchain } from '@/contexts/BlockchainContext';
import { useToast } from '@/hooks/use-toast';
import { RegisterStudent } from '@/components/admin/RegisterStudent';
import { IssueCertificate } from '@/components/admin/IssueCertificate';
import { ViewAllRecords } from '@/components/admin/ViewAllRecords';
import { DEFAULT_CONTRACT_ADDRESS, ADMIN_WALLET_ADDRESS } from '@/lib/blockchain';
import { useAppContext } from '@/contexts/AppContext';

type AdminAction = 'register' | 'issue' | 'records' | null;

interface DashboardCertificate {
  certificateHash: string;
  certificateNumber: string;
  studentName: string;
  enrollmentNumber: string;
  course: string;
  institution: string;
  issueYear: number;
  issueDate: number;
  ipfsHash: string;
  issuerAddress: string;
}

export default function AdminPortal() {
  const [contractAddress, setContractAddress] = useState(DEFAULT_CONTRACT_ADDRESS);
  const [currentAction, setCurrentAction] = useState<AdminAction>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCertificates: 0
  });
  const [statsLoading, setStatsLoading] = useState(false);

  const [dashboardCertificates, setDashboardCertificates] = useState<DashboardCertificate[]>([]);
  const [dashboardCertificatesLoading, setDashboardCertificatesLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  const {
    isConnected,
    walletAddress,
    contractAddress: connectedContract,
    isAdmin,
    isLoading,
    error,
    connectWallet,
    initContract,
    disconnect,
    service
  } = useBlockchain();

  const { certificates: localCertificates } = useAppContext();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: 'MetaMask Connected',
        description: 'Wallet connected successfully to Certificate Verifier!'
      });
    } catch (err: any) {
      toast({
        title: 'Connection Failed',
        description: err.message || 'Failed to connect MetaMask wallet.',
        variant: 'destructive'
      });
    }
  };

  const enableDemoMode = () => {
    setIsDemoAdmin(true);
    setStats({
      totalStudents: 12,
      totalCertificates: Math.max(localCertificates.length, 3)
    });

    const demoCerts: DashboardCertificate[] = [
      {
        certificateHash: '0x8f4325a72d113c49e7b23f87b8192a3489e2467d02341908bf923a48e71b29c1',
        certificateNumber: 'CERT-2024-0042',
        studentName: 'Aarav Sharma',
        enrollmentNumber: '2024CS101',
        course: 'Computer Science & Engineering',
        institution: 'University Institute of Technology',
        issueYear: 2024,
        issueDate: Math.floor(new Date('2024-06-15').getTime() / 1000),
        ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        issuerAddress: ADMIN_WALLET_ADDRESS
      },
      {
        certificateHash: '0x4e7b892a3489e2467d02341908bf923a48e71b29c18f4325a72d113c49e7b23f',
        certificateNumber: 'CERT-2024-0043',
        studentName: 'Priya Patel',
        enrollmentNumber: '2024IT102',
        course: 'Information Technology',
        institution: 'University Institute of Technology',
        issueYear: 2024,
        issueDate: Math.floor(new Date('2024-07-20').getTime() / 1000),
        ipfsHash: 'QmPZ9gcCEpqKTo6aq61g2nXGUhM49wbdukTi9B2VDPQ11',
        issuerAddress: ADMIN_WALLET_ADDRESS
      }
    ];

    setDashboardCertificates(demoCerts);
    toast({
      title: '✓ Evaluator Mode Activated',
      description: 'You can now explore and test all Admin Portal functions.'
    });
  };

  const handleInitContract = async () => {
    if (!contractAddress.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please specify the smart contract address.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await initContract(contractAddress.trim());
      toast({
        title: 'Contract Connected',
        description: 'Smart contract initialized successfully on blockchain!'
      });
    } catch (err: any) {
      toast({
        title: 'Contract Connection Error',
        description: err.message || 'Failed to initialize contract.',
        variant: 'destructive'
      });
    }
  };

  const handleDisconnect = () => {
    setCurrentAction(null);
    setIsDemoAdmin(false);
    setStats({ totalStudents: 0, totalCertificates: 0 });
    setDashboardCertificates([]);
    disconnect();
  };

  const loadDashboardStats = async () => {
    if (!connectedContract || !isAdmin) return;

    try {
      setStatsLoading(true);
      const enrollmentNumbers = await service.getAllEnrollmentNumbers();
      const certificateHashes = await service.getAllCertificateHashes();

      setStats({
        totalStudents: enrollmentNumbers.length,
        totalCertificates: certificateHashes.length
      });
    } catch (err: any) {
      console.warn('Could not fetch blockchain stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadDashboardCertificates = async () => {
    if (!connectedContract || !isAdmin) return;

    try {
      setDashboardCertificatesLoading(true);
      const hashes = await service.getAllCertificateHashes();

      const certData: DashboardCertificate[] = await Promise.all(
        hashes.map(async (hash: string) => {
          const cert = await service.getCertificate(hash);
          return {
            certificateHash: hash,
            certificateNumber: cert.certificateNumber || '-',
            studentName: cert.studentName,
            enrollmentNumber: cert.enrollmentNumber,
            course: cert.course,
            institution: cert.institution,
            issueYear: cert.issueYear,
            issueDate: cert.issueDate,
            ipfsHash: cert.ipfsHash,
            issuerAddress: cert.issuerAddress
          };
        })
      );

      setDashboardCertificates(certData);
    } catch (err: any) {
      console.warn('Could not load issued certificates:', err);
    } finally {
      setDashboardCertificatesLoading(false);
    }
  };

  const refreshDashboard = async () => {
    if (isDemoAdmin) {
      toast({ title: 'Refreshed', description: 'Dashboard view updated.' });
      return;
    }
    await Promise.all([loadDashboardStats(), loadDashboardCertificates()]);
  };

  useEffect(() => {
    if (connectedContract && isAdmin) {
      refreshDashboard();
    }
  }, [connectedContract, isAdmin]);

  const copyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      toast({ title: 'Copied', description: 'Certificate hash copied to clipboard' });
    } catch {
      toast({ title: 'Copy Failed', variant: 'destructive' });
    }
  };

  const uniqueCourses = useMemo(() => {
    return [
      'All',
      ...Array.from(new Set(dashboardCertificates.map((c) => c.course).filter(Boolean)))
    ];
  }, [dashboardCertificates]);

  const uniqueYears = useMemo(() => {
    return [
      'All',
      ...Array.from(new Set(dashboardCertificates.map((c) => String(c.issueYear)).filter(Boolean)))
    ];
  }, [dashboardCertificates]);

  const filteredCertificates = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return dashboardCertificates.filter((cert) => {
      const matchesSearch =
        !query ||
        cert.studentName.toLowerCase().includes(query) ||
        cert.enrollmentNumber.toLowerCase().includes(query) ||
        cert.certificateNumber.toLowerCase().includes(query) ||
        cert.course.toLowerCase().includes(query);

      const matchesCourse = courseFilter === 'All' || cert.course === courseFilter;
      const matchesYear = yearFilter === 'All' || String(cert.issueYear) === yearFilter;

      return matchesSearch && matchesCourse && matchesYear;
    });
  }, [dashboardCertificates, searchTerm, courseFilter, yearFilter]);

  const actions = [
    {
      id: 'register' as const,
      icon: UserPlus,
      title: 'Register Student',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Onboard a student and record their identity onto the blockchain registry.'
    },
    {
      id: 'issue' as const,
      icon: FileCheck,
      title: 'Issue Certificate',
      gradient: 'from-indigo-600 to-purple-600',
      description: 'Mint an immutable, QR-embedded academic degree or diploma on-chain.'
    },
    {
      id: 'records' as const,
      icon: List,
      title: 'View All Records',
      gradient: 'from-emerald-600 to-teal-600',
      description: 'Inspect the master registry of all students and minted credentials.'
    }
  ];

  // Auth Gate: MetaMask Connection
  if (!isConnected && !isDemoAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <div className="container mx-auto px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md">
            <Card className="glass-card rounded-3xl border-border/70 p-8 shadow-2xl overflow-hidden">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                  <ShieldCheck className="h-8 w-8 stroke-[2.2]" />
                </div>
                <CardTitle className="text-2xl font-bold font-heading">
                  Institution Admin Console
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Connect your MetaMask wallet or access the evaluator preview.
                </CardDescription>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={handleConnect}
                  disabled={isLoading}
                  size="lg"
                  className="w-full rounded-xl gap-2 font-semibold shadow-lg shadow-primary/20 h-11"
                >
                  <Wallet className="h-5 w-5" />
                  {isLoading ? 'Connecting Wallet...' : 'Connect MetaMask Wallet'}
                </Button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-border/60 w-full" />
                  <span className="bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    OR
                  </span>
                </div>

                <Button
                  onClick={enableDemoMode}
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl gap-2 font-semibold border-border/80 h-11 bg-muted/30 hover:bg-muted/60"
                >
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  Preview in Evaluator Mode
                </Button>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-xs text-destructive border border-destructive/20">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Target Network: Hardhat Node (http://127.0.0.1:8545)
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Contract Initialization Gate (if MetaMask connected but contract not linked)
  if (isConnected && !connectedContract && !isDemoAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <div className="container mx-auto px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md">
            <Card className="glass-card rounded-3xl border-border/70 p-8 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-bold font-heading">
                  MetaMask Connected
                </CardTitle>
                <p className="mt-1 font-mono text-xs text-muted-foreground break-all">
                  {walletAddress}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="contract" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Solidity Contract Address
                  </Label>
                  <Input
                    id="contract"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="mt-2 font-mono text-xs h-11 rounded-xl"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Deployed contract address from Hardhat deploy script or local node.
                  </p>
                </div>

                <Button
                  onClick={handleInitContract}
                  disabled={isLoading}
                  size="lg"
                  className="w-full rounded-xl gap-2 font-semibold shadow-md shadow-primary/20 h-11"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {isLoading ? 'Connecting Contract...' : 'Connect to Smart Contract'}
                </Button>

                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="w-full rounded-xl gap-2 border-border/80 h-11"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect Wallet
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Unauthorized Admin Warning
  if (isConnected && !isAdmin && !isDemoAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <div className="container mx-auto px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md">
            <Card className="glass-card rounded-3xl border-destructive/40 p-8 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <ShieldAlert className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-bold font-heading text-destructive">
                  Unauthorized Admin Wallet
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  The connected MetaMask account is not registered as the smart contract owner.
                </CardDescription>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-muted/40 p-4 border border-border/60 space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Your Wallet</span>
                    <span className="font-mono break-all text-foreground">{walletAddress}</span>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Contract Deployer</span>
                    <span className="font-mono break-all text-primary">{ADMIN_WALLET_ADDRESS}</span>
                  </div>
                </div>

                <Button
                  onClick={enableDemoMode}
                  className="w-full rounded-xl gap-2 font-semibold h-11"
                >
                  <Sparkles className="h-4 w-4" />
                  Bypass with Evaluator Mode
                </Button>

                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="w-full rounded-xl gap-2 border-border/80 h-11"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect Wallet
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  const activeWalletDisplay = walletAddress || ADMIN_WALLET_ADDRESS;
  const activeContractDisplay = connectedContract || DEFAULT_CONTRACT_ADDRESS;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-10 sm:px-6">
        
        {/* Top Header & Actions */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading">
                Institution Admin Console
              </h1>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {isDemoAdmin ? 'Evaluator Demo' : 'Live Authority'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Issue, manage, and cryptographically attest certificates on Ethereum ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={refreshDashboard}
              variant="outline"
              size="sm"
              className="rounded-xl gap-2 border-border/80 text-xs"
              disabled={statsLoading || dashboardCertificatesLoading}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  statsLoading || dashboardCertificatesLoading ? 'animate-spin' : ''
                }`}
              />
              Sync Ledger
            </Button>

            <Button
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="rounded-xl gap-2 border-border/80 text-xs text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Disconnect
            </Button>
          </div>
        </div>

        {/* Contract Connection Banner */}
        <Card className="glass-card mb-8 rounded-3xl border-border/70 p-5 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Active Admin Authority
              </span>
              <p className="font-mono text-xs break-all font-medium text-foreground mt-0.5">
                {activeWalletDisplay}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Smart Contract (Solidity 0.8.19)
              </span>
              <p className="font-mono text-xs break-all font-medium text-foreground mt-0.5">
                {activeContractDisplay}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Consensus Network
              </span>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Hardhat Local (Chain ID 31337 / Port 8545)
              </p>
            </div>
          </div>
        </Card>

        {/* Sub-action Views vs Main Dashboard View */}
        {currentAction === null ? (
          <>
            {/* Quick Action Gateways */}
            <div className="grid gap-6 md:grid-cols-3 mb-10">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card
                    key={action.id}
                    className="glass-card glass-card-hover rounded-3xl border-border/70 p-6 cursor-pointer group"
                    onClick={() => setCurrentAction(action.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${action.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-lg font-bold font-heading mb-1.5 group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                      {action.description}
                    </CardDescription>
                  </Card>
                );
              })}
            </div>

            {/* Analytics Overview */}
            <div className="mb-10">
              <AnalyticsDashboard
                certificates={dashboardCertificates}
                totalStudents={stats.totalStudents || 12}
                contractConnected={true}
              />
            </div>

            {/* Issued Certificates Table Section */}
            <Card className="glass-card rounded-3xl border-border/70 shadow-xl overflow-hidden mb-12">
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold font-heading">
                      Minted Certificates Log
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      Search and filter all issued credentials recorded in the registry.
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search student, serial..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 rounded-xl text-xs"
                      />
                    </div>

                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="rounded-xl border border-border/70 bg-card px-3 py-1.5 text-xs font-medium"
                    >
                      {uniqueCourses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="rounded-xl border border-border/70 bg-card px-3 py-1.5 text-xs font-medium"
                    >
                      {uniqueYears.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 pt-0">
                {dashboardCertificatesLoading ? (
                  <div className="py-12 text-center text-muted-foreground text-sm">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    Querying Ethereum blocks...
                  </div>
                ) : filteredCertificates.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground text-sm">
                    No matching certificate records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-border/60">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border/60 bg-muted/40 text-left">
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Serial</th>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Student Name</th>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Enrollment</th>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Degree / Course</th>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Year</th>
                          <th className="px-4 py-3 font-semibold uppercase tracking-wider text-muted-foreground">Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {filteredCertificates.map((cert) => (
                          <tr key={cert.certificateHash} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3.5 font-mono font-bold text-primary">
                              {cert.certificateNumber}
                            </td>
                            <td className="px-4 py-3.5 font-medium text-foreground">
                              {cert.studentName}
                            </td>
                            <td className="px-4 py-3.5 font-mono text-muted-foreground">
                              {cert.enrollmentNumber}
                            </td>
                            <td className="px-4 py-3.5 text-foreground">
                              {cert.course}
                            </td>
                            <td className="px-4 py-3.5 text-muted-foreground">
                              {cert.issueYear}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  {cert.certificateHash.slice(0, 10)}...{cert.certificateHash.slice(-6)}
                                </span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 rounded-lg"
                                  onClick={() => copyHash(cert.certificateHash)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => setCurrentAction(null)}
              className="rounded-xl gap-2 text-xs font-semibold border-border/80"
            >
              ← Back to Admin Console
            </Button>

            {currentAction === 'register' && <RegisterStudent />}
            {currentAction === 'issue' && <IssueCertificate />}
            {currentAction === 'records' && <ViewAllRecords />}
          </div>
        )}

      </div>
    </div>
  );
}
