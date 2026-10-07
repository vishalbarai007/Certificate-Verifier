# 🛠️ Technology Stack & Component Specifications

This document outlines all technical libraries, frameworks, runtime environments, and blockchain protocols used in the **Certificate Verifier** ecosystem, including design rationale and comparative analysis.

---

## 1. Technology Matrix Overview

| Category | Technology | Version | Purpose / Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `^18.3.1` | Component-driven declarative UI, concurrent rendering, and active ecosystem. |
| **Language** | **TypeScript** | `^5.8.3` | Strong compile-time typing, contract ABI interface verification, refactoring safety. |
| **Build Tool & Bundler** | **Vite** | `^5.4.19` | Near-instant HMR (Hot Module Replacement) and optimized ES-module bundling. |
| **Styling & Design** | **Tailwind CSS** | `^3.4.17` | Utility-first CSS architecture, custom HSL design tokens, responsive breakpoints. |
| **Theme Engine** | **next-themes** | `^0.3.0` | Zero-FOUC theme switching (Dark / Light / System) with LocalStorage persistence. |
| **UI Primitives** | **Radix UI** | `^1.1.x` | Accessible, unstyled UI headless primitives (Dialog, Tabs, Dropdowns, Tooltips). |
| **Iconography** | **Lucide React** | `^0.462.0` | Crisp, consistent SVG icons with tree-shaking support. |
| **Web3 Client** | **Ethers.js** | `^5.7.2` | Clean abstractions for JsonRpcProvider, Contract abstraction, and Signer handling. |
| **Smart Contract Language** | **Solidity** | `^0.8.19` | Industry-standard EVM smart contract programming language with overflow checks. |
| **Consensus Testnet** | **Hardhat Node** | `v3.18.x` | High-speed local EVM node simulating Ethereum consensus at `127.0.0.1:8545` (Chain ID `31337`). |
| **Cryptographic Wallet** | **MetaMask** | Extension | Client-side private key custodian, transaction signing, and network routing. |
| **QR Generation** | **qrcode.react** | `^4.2.0` | Fast SVG/Canvas rendering of verification URLs for physical certificates. |
| **QR Code Scanner** | **html5-qrcode** | `^2.3.8` | Client-side computer vision decoding for uploaded certificate images. |
| **PDF Generation** | **jsPDF & html2canvas**| `^4.2.0` | High-resolution rasterization and vector PDF synthesis of printed certificates. |
| **Hashing Engine** | **crypto-js** | `^4.2.0` | Deterministic SHA-256 computation in the browser client. |

---

## 2. Why These Technologies Were Selected

### 1. Ethers.js vs. Web3.js
- **Size & Performance**: Ethers.js has a smaller bundle size and cleaner modular package hierarchy.
- **Contract Type Safety**: Ethers allows passing simple human-readable ABI arrays (e.g. `'function verifyCertificate(string) view returns (bool)'`) rather than requiring bulky JSON artifacts.
- **Provider / Signer Separation**: Strict architectural separation between readonly queries (`Provider`) and state-modifying actions (`Signer`).

### 2. Vite vs. Create React App (CRA)
- CRA is officially deprecated by the React team.
- Vite utilizes native browser ES modules during development, resulting in sub-200ms startup times compared to 30s+ webpack bundling times.
- Rollup-based production tree-shaking ensures lightweight deployment artifacts.

### 3. Tailwind CSS & Custom Token System
- Rapid prototyping without switching between CSS files.
- Eliminates styling dead-code via PurgeCSS / JIT compilation.
- Seamless Dark/Light mode synchronization via class strategy (`darkMode: ["class"]`) using curated HSL color spaces.

### 4. Solidity 0.8.19
- Built-in integer overflow/underflow protection without requiring external `SafeMath` libraries.
- Optimal gas consumption for storage mappings.
- Widespread compatibility with EVM tooling (Hardhat, Remix, Foundry).

---

## 3. Directory Layout & Key Modules

```
├── docs/                     # Technical documentation & interactive HTML models
│   ├── ARCHITECTURE.md       # Architectural deep-dive
│   ├── TECH_STACK.md         # Technology specs & libraries
│   ├── SECURITY_MODEL.md     # Cryptographic security & audit analysis
│   ├── USER_GUIDE.md         # Setup & operation manual
│   ├── flowchart.html        # Interactive animated HTML flowchart
│   └── pipeline.html         # Interactive animated HTML pipeline
├── public/                   # Static public assets & served docs
├── src/
│   ├── components/           # Reusable UI & admin components
│   │   ├── admin/            # Admin widgets (Register, Issue, Records, Preview)
│   │   ├── ui/               # Radix UI design primitives
│   │   ├── Navbar.tsx        # Responsive navigation & brand bar
│   │   └── ThemeToggle.tsx   # Light / Dark / System theme switcher
│   ├── contexts/             # React state context providers
│   │   ├── AppContext.tsx    # Certificate caching & local storage
│   │   └── BlockchainContext.tsx # Ethers provider, signer, and contract state
│   ├── lib/
│   │   ├── blockchain.ts     # Blockchain service, ABI, and constants
│   │   └── utils.ts          # Class merging (cn) utilities
│   ├── pages/                # Primary portal views
│   │   ├── Index.tsx         # Home gateway & quick verify
│   │   ├── AdminPortal.tsx   # Institution admin dashboard
│   │   ├── StudentPortal.tsx # Student dashboard & downloads
│   │   └── VerifyCertificate.tsx # Multi-modal public verifier
│   ├── App.tsx               # Root component & theme provider
│   └── index.css             # Design tokens & animations
└── index.html                # App shell, fonts, anti-FOUC script
```
