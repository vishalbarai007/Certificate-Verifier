import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  GraduationCap,
  FileCheck,
  Search,
  Sparkles,
  Workflow,
  ExternalLink,
  QrCode,
  Fingerprint,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';

export default function Index() {
  const [quickHash, setQuickHash] = useState('');
  const navigate = useNavigate();

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickHash.trim()) {
      navigate(`/verify?hash=${encodeURIComponent(quickHash.trim())}`);
    } else {
      navigate('/verify');
    }
  };

  const sampleDemoHashes = [
    { label: 'Sample Degree', hash: '0x8f4325a72d113c49e7b23f87b8192a3489e2467d02341908bf923a48e71b29c1' },
    { label: 'Sample Diploma', hash: '0x4e7b892a3489e2467d02341908bf923a48e71b29c18f4325a72d113c49e7b23f' }
  ];

  const metrics = [
    { value: '100%', label: 'Immutable Records' },
    { value: '< 1.5s', label: 'Instant Verification' },
    { value: 'SHA-256', label: 'Cryptographic Hash' },
    { value: 'Zero', label: 'Fraud Risk' }
  ];

  const portals = [
    {
      to: '/verify',
      icon: CheckCircle2,
      title: 'Public Verification',
      tag: 'Public',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: 'Authenticate academic certificates and scan physical QR codes instantly with zero login required.',
      actionText: 'Verify Credential',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      to: '/student',
      icon: GraduationCap,
      title: 'Student Portal',
      tag: 'Students',
      tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      description: 'Access your issued credentials, download verified tamper-proof PDFs, and share your records.',
      actionText: 'Access Diplomas',
      gradient: 'from-indigo-600 to-purple-600'
    },
    {
      to: '/admin',
      icon: ShieldCheck,
      title: 'Institution Admin',
      tag: 'Authorized',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      description: 'Register eligible students, mint immutable credentials, and manage on-chain attestation.',
      actionText: 'Launch Admin',
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  const features = [
    {
      icon: Fingerprint,
      title: 'Cryptographic Hash',
      text: 'Every certificate is fingerprinted with an immutable SHA-256 digest.'
    },
    {
      icon: Lock,
      title: 'Ethereum Ledger',
      text: 'Permanent smart contract records with zero single points of failure.'
    },
    {
      icon: QrCode,
      title: 'QR Code Bridge',
      text: 'Validate physical printouts instantly with any mobile camera.'
    },
    {
      icon: Cpu,
      title: 'Direct Consensus',
      text: 'Instant cryptographic attestation without third-party delays.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Glow Spheres & Grid Backdrop */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl opacity-75" />
          <div className="absolute -top-24 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 mesh-grid opacity-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="mx-auto max-w-3xl text-center">
            
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Decentralized Credential Verification</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl font-heading mb-4 leading-[1.1]">
              Verify Credentials <br />
              <span className="gradient-text">On Ethereum</span>
            </h1>

            {/* Concise Subtitle */}
            <p className="mx-auto max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Instant, tamper-proof academic verification powered by smart contracts.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl mb-6">
              <form
                onSubmit={handleQuickVerify}
                className="relative flex items-center rounded-2xl border border-border/80 bg-card/80 p-2 shadow-xl backdrop-blur-xl transition-all focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20"
              >
                <div className="pl-3 pr-2 text-muted-foreground">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter Certificate Hash or Document ID..."
                  value={quickHash}
                  onChange={(e) => setQuickHash(e.target.value)}
                  className="border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-2 placeholder:text-muted-foreground/60"
                />
                <Button type="submit" size="default" className="rounded-xl px-5 gap-2 font-semibold shadow-md shadow-primary/20">
                  Verify
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Sample Quick Demo Tags */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="text-muted-foreground/70">Try sample:</span>
                {sampleDemoHashes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuickHash(item.hash);
                      navigate(`/verify?hash=${item.hash}`);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-3 w-3 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="default" className="rounded-xl px-6 gap-2 shadow-md shadow-primary/20 font-semibold">
                <Link to="/verify">
                  <FileCheck className="h-4 w-4" />
                  Verify Certificate
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="rounded-xl px-6 gap-2 border-border/80 bg-card/50 backdrop-blur-md hover:bg-muted/60 font-semibold">
                <Link to="/student">
                  <GraduationCap className="h-4 w-4 text-indigo-500" />
                  Student Portal
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="rounded-xl px-6 gap-2 border-border/80 bg-card/50 backdrop-blur-md hover:bg-muted/60 font-semibold">
                <Link to="/admin">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Institution Admin
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Metrics Ribbon */}
      <section className="border-y border-border/60 bg-card/30 backdrop-blur-md py-6 transition-colors">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {metrics.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading gradient-text">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Select Portal
            </h2>
            <p className="text-muted-foreground text-sm">
              Role-based gateways for verifiers, students, and institutions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {portals.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link key={idx} to={portal.to} className="group block h-full">
                  <Card className="glass-card glass-card-hover h-full flex flex-col justify-between overflow-hidden border-border/70 rounded-2xl p-6 relative">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${portal.gradient} text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${portal.tagColor}`}>
                          {portal.tag}
                        </span>
                      </div>

                      <CardTitle className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>{portal.title}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                      </CardTitle>

                      <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {portal.description}
                      </CardDescription>
                    </div>

                    <div className="pt-5 mt-5 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>{portal.actionText}</span>
                      <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Concise Security Features */}
      <section className="border-t border-border/60 bg-muted/20 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Key Advantages
            </h2>
            <p className="text-muted-foreground text-sm">
              Cryptographic assurances built directly on Ethereum.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold font-heading mb-1 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Minimal Blueprint Banner */}
          <div className="mt-10 rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Workflow className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Technical Blueprint & Diagrams</h4>
                <p className="text-xs text-muted-foreground">Interactive smart contract lifecycle and data pipeline.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-xl px-4 gap-1.5 text-xs bg-background/50">
                <a href="/docs/flowchart.html" target="_blank" rel="noreferrer">
                  <span>Flowchart</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-xl px-4 gap-1.5 text-xs bg-background/50">
                <a href="/docs/pipeline.html" target="_blank" rel="noreferrer">
                  <span>Pipeline</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-border/60 bg-card/40 py-8 text-xs text-muted-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-foreground font-heading">Certificate Verifier</span>
              <span className="text-muted-foreground/50 hidden sm:inline">•</span>
              <span className="hidden sm:inline text-xs text-muted-foreground">Blockchain Credential Attestation</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/verify" className="hover:text-foreground transition-colors">Verify</Link>
              <Link to="/student" className="hover:text-foreground transition-colors">Student</Link>
              <Link to="/admin" className="hover:text-foreground transition-colors">Admin</Link>
              <a href="/docs/flowchart.html" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Docs</a>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hardhat Node (31337)</span>
            </div>
          </div>

          <div className="border-t border-border/40 mt-6 pt-4 text-center sm:flex sm:justify-between sm:text-left text-[11px] text-muted-foreground/80">
            <p>Developed by <strong className="text-foreground font-medium">Vishal Barai</strong> • Major Project</p>
            <p className="mt-1 sm:mt-0">Ethereum Smart Contracts & React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
