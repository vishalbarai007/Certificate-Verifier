import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  GraduationCap,
  CheckCircle,
  Menu,
  X,
  FileCode2,
  Workflow,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { useBlockchain } from '@/contexts/BlockchainContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, walletAddress } = useBlockchain();

  const navLinks = [
    { to: '/', label: 'Home', icon: ShieldCheck },
    { to: '/verify', label: 'Verify Credential', icon: CheckCircle, highlight: true },
    { to: '/student', label: 'Student Portal', icon: GraduationCap },
    { to: '/admin', label: 'Admin Portal', icon: ShieldCheck },
  ];

  const shortAddress = walletAddress
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="h-6 w-6 text-white stroke-[2.2]" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-30 blur transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground font-heading flex items-center gap-1.5">
              Certificate <span className="text-primary font-extrabold">Verifier</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/80 -mt-1 font-medium">
              Blockchain Attestation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                    : link.highlight
                    ? "text-primary hover:bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", link.highlight && !isActive ? "text-primary" : "")} />
                {link.label}
                {link.highlight && !isActive && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </Link>
            );
          })}

          {/* Interactive Docs & Diagrams Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground rounded-xl">
                <Workflow className="h-4 w-4 text-indigo-500" />
                <span>Architecture</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/60 bg-card/95 backdrop-blur-xl">
              <DropdownMenuItem asChild>
                <a
                  href="/docs/flowchart.html"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 cursor-pointer py-2"
                >
                  <Workflow className="h-4 w-4 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Interactive Flowchart</span>
                    <span className="text-[10px] text-muted-foreground">Animated lifecycle steps</span>
                  </div>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="/docs/pipeline.html"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 cursor-pointer py-2"
                >
                  <FileCode2 className="h-4 w-4 text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Pipeline Architecture</span>
                    <span className="text-[10px] text-muted-foreground">Live data pipeline stream</span>
                  </div>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Controls & Theme Toggle */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Network Badge */}
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                isConnected ? "bg-emerald-400" : "bg-amber-400"
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                isConnected ? "bg-emerald-500" : "bg-amber-500"
              )} />
            </span>
            <span>{isConnected ? (shortAddress || 'Connected') : 'Ganache 1337'}</span>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-2xl p-4 md:hidden animate-fade-in shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </div>
                  {link.highlight && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      Live
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="my-2 border-t border-border/60" />

            <div className="flex flex-col gap-1.5 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Architecture & Models
              </span>
              <a
                href="/docs/flowchart.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs py-2 text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <Workflow className="h-3.5 w-3.5 text-blue-500" />
                  Interactive Flowchart
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
              <a
                href="/docs/pipeline.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs py-2 text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <FileCode2 className="h-3.5 w-3.5 text-emerald-500" />
                  Pipeline Architecture
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-muted/50 p-3 text-xs">
              <span className="text-muted-foreground">Network State</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                {isConnected ? (shortAddress || 'Connected') : 'Ganache (Port 7545)'}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
