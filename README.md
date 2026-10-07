# 🎓 Certificate Verifier

A decentralized, tamper-proof **Blockchain Academic Certificate Verification Platform** that enables educational institutions to issue cryptographically signed certificates and allows students, employers, and authorities to verify credentials instantly using **Ethereum Smart Contracts** and **Hardhat**.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Solidity: 0.8.19](https://img.shields.io/badge/Solidity-0.8.19-363636.svg)
![Hardhat: 3.18](https://img.shields.io/badge/Hardhat-3.18-yellow.svg)
![React: 18](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript: 5.8](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)
![Tailwind: 3.4](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)

---

## 👨‍💻 Developer & Author

**Vishal Barai**  
Computer Engineering  
Blockchain • Full Stack Development • Web3 Enthusiast  
GitHub: [https://github.com/vishalbarai007](https://github.com/vishalbarai007)  
Repository: [https://github.com/vishalbarai007/Certificate-Verifier.git](https://github.com/vishalbarai007/Certificate-Verifier.git)

---

## 🌟 Key Features

### 🏛️ 1. Institution Admin Portal
* **MetaMask Web3 Authentication**: Cryptographic wallet login enforcing smart contract owner authority.
* **Student Onboarding**: Register student metadata (Enrollment ID, legal name, email, department, batch) on-chain.
* **Certificate Minting**: Auto-computes deterministic SHA-256 hash and generates unique serial numbers (`CERT-YYYY-XXXX`).
* **Evaluator Preview Mode**: Live demo access to explore admin features with or without MetaMask.
* **Analytics Dashboard**: Real-time breakdown of degrees issued, student cohorts, and verification metrics.

### 🎓 2. Student Credential Portal
* **Student Login**: Secure authentication using academic enrollment number and passkey.
* **Academic Transcripts**: Instant access to all blockchain-registered degrees and diplomas.
* **High-Res PDF Export**: One-click generation of official certificate parchment with embedded QR codes.
* **QR Verification Export**: Export high-correction PNG QR codes for physical resumes and LinkedIn profiles.

### 🔍 3. Public Verification Portal
* **Zero-Auth Public Access**: Anyone (employers, embassies, universities) can verify credentials with no login or gas fees.
* **Multi-Modal Verification**:
  - Direct SHA-256 Hash input
  - Public verification URL lookup
  - Camera & Image QR Code upload decoding
* **Cryptographic Attestation**: Displays green authenticity seal, transaction hash, block timestamp, and issuing authority.

---

## 📚 Technical Documentation

Explore the comprehensive technical guides and operational manuals:

- **[🚀 Complete Run Guide (`RUN_GUIDE.md`)](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/RUN_GUIDE.md)**: Comprehensive, multi-terminal walkthrough covering Hardhat node setup, deployment, MetaMask configuration, and troubleshooting.
- **[Documentation Index](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/README.md)**: Master overview of all system components.
- **[System Architecture](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/ARCHITECTURE.md)**: Multi-layer engineering breakdown, data models, and sequence diagrams.
- **[Technology Stack](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/TECH_STACK.md)**: Specifications for React, Vite, Tailwind, Ethers.js, and Solidity.
- **[Security Model](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/SECURITY_MODEL.md)**: Threat analysis, SHA-256 collision resistance, and access control.
- **[User Guide & Manual](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/USER_GUIDE.md)**: Detailed operational workflows for Admins, Students, and Verifiers.
- **[Interactive Flowchart (`flowchart.html`)](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/flowchart.html)**: Standalone animated flowchart showing data flow across the token lifecycle.
- **[Pipeline Architecture (`pipeline.html`)](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/pipeline.html)**: Interactive animated multi-stage data processing pipeline with real-time logs console.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3.4, Radix UI Primitives, Lucide Icons, next-themes (Dark/Light toggle).
- **Blockchain Framework**: Hardhat v3 (Local EVM node, compilation, testing, and deployment).
- **Smart Contracts**: Solidity 0.8.19 (`contracts/CertificateVerification.sol`).
- **Web3 Bridge**: Ethers.js v5.7.2 (JsonRpcProvider & Contract abstractions).
- **Local Network**: Hardhat Local Node (`http://127.0.0.1:8545`, Chain ID `31337`).
- **Cryptographic Tools**: SHA-256 digest engine, QRCodeSVG, Html5Qrcode scanner, jsPDF, html2canvas.

---

## ⚙️ Quick Start

For a detailed step-by-step walkthrough, see **[RUN_GUIDE.md](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/RUN_GUIDE.md)**.

### 1️⃣ Clone & Install
```bash
git clone https://github.com/vishalbarai007/Certificate-Verifier.git
cd Certificate-Verifier
npm install
```

### 2️⃣ Start Local Hardhat Blockchain Node
In Terminal 1:
```bash
npm run hardhat:node
```
Runs at `http://127.0.0.1:8545` (Chain ID `31337`). Keep this running.

### 3️⃣ Compile & Deploy Smart Contract
In Terminal 2:
```bash
npm run hardhat:compile
npm run hardhat:deploy
```
This deploys `CertificateVerification.sol` and automatically updates `src/lib/blockchain.ts` and `src/lib/deployment.json`.

### 4️⃣ Start Frontend Application
In Terminal 3:
```bash
npm run dev
```
Open **`http://localhost:8080`** in your browser.

---

## 🦊 MetaMask Configuration

To interact with the smart contract via MetaMask:

1. **Add Network**:
   - **Network Name**: `Hardhat Local`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
2. **Import Admin Account** (Pre-funded with 10,000 ETH):
   - Import Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

---

## 📜 Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `hardhat:node` | `npm run hardhat:node` | Start local Hardhat EVM blockchain node on port 8545 |
| `hardhat:compile` | `npm run hardhat:compile` | Compile Solidity contracts |
| `hardhat:deploy` | `npm run hardhat:deploy` | Deploy contracts and auto-sync contract address & ABI |
| `dev` | `npm run dev` | Launch Vite frontend development server |
| `build` | `npm run build` | Build production bundle for deployment |
| `lint` | `npm run lint` | Run ESLint static code analysis |

---

## 📜 License
Distributed under the MIT License. Created for major academic project and research purposes.
