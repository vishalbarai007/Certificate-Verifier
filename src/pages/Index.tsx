import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  GraduationCap,
  FileCheck,
  Search,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  ExternalLink,
  QrCode,
  Fingerprint,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    { label: 'Sample Degree Cert', hash: '0x8f4325a72d113c49e7b23f87b8192a3489e2467d02341908bf923a48e71b29c1' },
    { label: 'Sample Diploma Cert', hash: '0x4e7b892a3489e2467d02341908bf923a48e71b29c18f4325a72d113c49e7b23f' }
  ];

  const metrics = [
    { value: '100%', label: 'Tamper Proof', desc: 'Immutable Ethereum smart contract record' },
    { value: '< 1.5s', label: 'Instant Verification', desc: 'Direct blockchain ledger query via RPC' },
    { value: 'SHA-256', label: 'Cryptographic Hashing', desc: 'Keccak-256 / SHA-256 credential fingerprint' },
    { value: '0 Paper', label: 'Eco-Friendly & Fraud-Free', desc: 'Zero forged diplomas or counterfeit papers' }
  ];

  const portals = [
    {
      to: '/verify',
      icon: CheckCircle2,
      title: 'Public Verification Portal',
      tag: 'Public Access',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: 'Employers, embassies, and universities can verify academic authenticity instantly with zero account required.',
      features: ['Search by Hash / Serial', 'Scan QR Code via Camera/Image', 'Digital Trust Cryptographic Seal'],
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      to: '/student',
      icon: GraduationCap,
      title: 'Student Credential Portal',
      tag: 'Student Login',
      tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      description: 'Access your issued degrees and certifications. Download high-resolution tamper-proof PDFs with embedded QR codes.',
      features: ['Enrollment Login Access', 'Verified QR Verification Badge', 'Printable Academic Transcripts'],
      gradient: 'from-indigo-600 to-purple-600'
    },
    {
      to: '/admin',
      icon: ShieldCheck,
      title: 'Institution & Admin Portal',
      tag: 'Restricted Access',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      description: 'University registrars and authorized issuers can onboard students, mint verified credentials, and track analytics.',
      features: ['MetaMask Wallet Authentication', 'Batch Student Registration', 'Immutable Smart Contract Minting'],
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  const securityPillars = [
    {
      icon: Fingerprint,
      title: 'Unique Digital Fingerprint',
      text: 'Every certificate generates an unalterable SHA-256 cryptographic digest matching student ID, course, and date.'
    },
    {
      icon: Lock,
      title: 'Decentralized Consensus',
      text: 'Records are permanently cemented on the blockchain. Once minted, no database administrator can modify or erase them.'
    },
    {
      icon: QrCode,
      title: 'One-Scan Physical Bridge',
      text: 'Every printed physical document carries a dynamic QR code leading to its verified on-chain cryptographic state.'
    },
    {
      icon: Cpu,
      title: 'EVM Smart Contract Logic',
      text: 'Built with Solidity 0.8.19 utilizing role-based access control and gas-optimized storage slots.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glow Spheres & Grid Backdrop */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl opacity-70 dark:opacity-90" />
          <div className="absolute -top-32 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-48 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 mesh-grid opacity-30 dark:opacity-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="mx-auto max-w-4xl text-center">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md mb-8 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span>Decentralized Academic Trust Architecture</span>
              <span className="hidden sm:inline text-muted-foreground/60">•</span>
              <span className="hidden sm:inline text-muted-foreground font-normal">Ethereum & Smart Contracts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl font-heading mb-6 leading-[1.1]">
              Next-Gen Academic <br />
              <span className="gradient-text">Certificate Verifier</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Eliminate fake degrees and unauthorized credentials. Secure, tamper-proof academic 
              certificate issuance and instant public verification built on Ethereum blockchain technology.
            </p>

            {/* Live Instant Search Bar */}
            <div className="mx-auto max-w-2xl mb-8">
              <form
                onSubmit={handleQuickVerify}
                className="relative flex items-center rounded-2xl border border-border/80 bg-card/90 p-2 shadow-xl backdrop-blur-xl transition-all focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20 dark:bg-card/70"
              >
                <div className="pl-3 pr-2 text-muted-foreground">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <Input
                  type="text"
                  placeholder="Paste Certificate Hash or Document Serial No..."
                  value={quickHash}
                  onChange={(e) => setQuickHash(e.target.value)}
                  className="border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-2 placeholder:text-muted-foreground/60"
                />
                <Button type="submit" size="default" className="rounded-xl px-5 gap-2 font-semibold shadow-md shadow-primary/25">
                  Verify Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Sample Quick Demo Tags */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">Try Sample:</span>
                {sampleDemoHashes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuickHash(item.hash);
                      navigate(`/verify?hash=${item.hash}`);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-mono hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl px-7 gap-2 shadow-lg shadow-primary/25 font-semibold text-base">
                <Link to="/verify">
                  <FileCheck className="h-5 w-5" />
                  Verify a Certificate
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-7 gap-2 border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted/60 font-semibold text-base">
                <Link to="/admin">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Institution Admin
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-xl px-6 gap-2 text-muted-foreground hover:text-foreground">
                <a href="/docs/flowchart.html" target="_blank" rel="noreferrer">
                  <Workflow className="h-5 w-5 text-indigo-500" />
                  Interactive Flowchart
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Stat Ribbon */}
      <section className="border-y border-border/60 bg-card/40 backdrop-blur-md py-10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl transition-transform hover:scale-105">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading gradient-text mb-1">
                  {item.value}
                </span>
                <span className="text-sm font-semibold text-foreground mb-1">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground max-w-[180px]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Portals Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 mb-3">
              <Layers className="h-3.5 w-3.5" />
              Role-Based Gateways
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Explore Certificate Verifier Portals
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Dedicated interfaces tailored for universities, students, employers, and public verifiers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {portals.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link key={idx} to={portal.to} className="group block h-full">
                  <Card className="glass-card glass-card-hover h-full flex flex-col justify-between overflow-hidden border-border/70 rounded-2xl relative">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${portal.gradient} text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${portal.tagColor}`}>
                          {portal.tag}
                        </span>
                      </div>

                      <CardTitle className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                        {portal.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                      </CardTitle>

                      <CardDescription className="text-sm leading-relaxed text-muted-foreground mb-6">
                        {portal.description}
                      </CardDescription>

                      <div className="space-y-2 pt-2 border-t border-border/40">
                        {portal.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-muted/30 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary group-hover:bg-primary/5 transition-colors">
                      <span>Enter Gateway</span>
                      <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Pillars / How It Works */}
      <section className="border-t border-border/60 bg-muted/20 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Cryptographic Pillars of Trust
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Why traditional paper certificates and centralized databases fail against modern counterfeiting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {securityPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold font-heading mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Documentation Callout */}
          <div className="mt-14 rounded-3xl border border-border/80 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-cyan-500/10 p-8 backdrop-blur-xl md:flex md:items-center md:justify-between">
            <div className="max-w-xl mb-6 md:mb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                Interactive Technical Blueprint
              </span>
              <h3 className="text-2xl font-bold font-heading mt-1 mb-2 text-foreground">
                View Live Animated Flowchart & Pipeline Diagrams
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore the complete token lifecycle, smart contract logic, state transitions, and step-by-step verification flows.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-xl px-5 gap-2 shadow-md">
                <a href="/docs/flowchart.html" target="_blank" rel="noreferrer">
                  <Workflow className="h-4 w-4" />
                  Open Flowchart
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-5 gap-2 bg-card/80">
                <a href="/docs/pipeline.html" target="_blank" rel="noreferrer">
                  <Cpu className="h-4 w-4 text-emerald-500" />
                  Open Pipeline
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/50 py-12 text-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg font-heading">Certificate Verifier</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A decentralized Ethereum smart contract platform eliminating diploma fraud and automating academic credential attestation worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3 font-heading">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home Gateway</Link></li>
                <li><Link to="/verify" className="hover:text-primary transition-colors">Verify Certificate</Link></li>
                <li><Link to="/student" className="hover:text-primary transition-colors">Student Portal</Link></li>
                <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3 font-heading">
                Architecture & Docs
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/docs/flowchart.html" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Animated Flowchart</a></li>
                <li><a href="/docs/pipeline.html" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Data Pipeline Diagram</a></li>
                <li><span className="hover:text-primary cursor-pointer">Solidity Contract ABI</span></li>
                <li><span className="hover:text-primary cursor-pointer">Security Specs</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground mb-3 font-heading">
                Network & Tech
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Ethereum VM • Ethers.js v5 • Hardhat Node (Port 8545) • MetaMask Integration
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Network Online: Chain 31337
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
            <p>
              Developed by <strong className="text-foreground">Vishal Barai</strong> • Certificate Verifier Major Project
            </p>
            <p className="text-[11px]">
              Built with React 18, TypeScript, Tailwind CSS, & Ethereum Blockchain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
