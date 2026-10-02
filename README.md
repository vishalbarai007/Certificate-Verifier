# 🎓 Certificate Verifier

A decentralized, tamper-proof **Blockchain Academic Certificate Verification Platform** that enables educational institutions to issue cryptographically signed certificates and allows students, employers, and authorities to verify credentials instantly using **Ethereum Smart Contracts**.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Solidity: 0.8.19](https://img.shields.io/badge/Solidity-0.8.19-363636.svg)
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

## 📚 Technical Documentation (`docs/`)

Explore the comprehensive technical documentation and interactive diagrams included in the project:

- **[Documentation Index](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/README.md)**: Master overview of all system components.
- **[System Architecture](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/ARCHITECTURE.md)**: Multi-layer engineering breakdown, data models, and sequence diagrams.
- **[Technology Stack](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/TECH_STACK.md)**: Specifications for React, Vite, Tailwind, Ethers.js, and Solidity.
- **[Security Model](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/SECURITY_MODEL.md)**: Threat analysis, SHA-256 collision resistance, and access control.
- **[User Guide & Manual](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/USER_GUIDE.md)**: Step-by-step setup for Ganache, MetaMask, and Remix IDE.
- **[Interactive Flowchart (`flowchart.html`)](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/flowchart.html)**: Standalone animated flowchart showing data packet flow across the token lifecycle.
- **[Pipeline Architecture (`pipeline.html`)](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/docs/pipeline.html)**: Interactive animated multi-stage data processing pipeline with real-time logs console.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3.4, Radix UI Primitives, Lucide Icons, next-themes (Dark/Light toggle).
- **Blockchain**: Solidity 0.8.19, Ethereum Virtual Machine (EVM), Ethers.js v5.7.2.
- **Local Network**: Ganache Local RPC (`http://127.0.0.1:7545`, Chain ID `1337`).
- **Cryptographic Tools**: SHA-256 digest engine, QRCodeSVG, Html5Qrcode scanner, jsPDF, html2canvas.

---

## ⚙️ Quick Start

### 1️⃣ Clone Repository
```bash
git clone https://github.com/vishalbarai007/Certificate-Verifier.git
cd Certificate-Verifier
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```
Visit `http://localhost:8080` in your web browser.

---

## ⛓️ Blockchain Network Setup

1. Start **Ganache** (RPC: `http://127.0.0.1:7545`, Network ID: `1337`).
2. Deploy [`CertificateVerification.sol`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/.sol) via **Remix IDE** using **Injected Provider - MetaMask**.
3. Update `DEFAULT_CONTRACT_ADDRESS` in [`src/lib/blockchain.ts`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/src/lib/blockchain.ts).
4. Connect MetaMask to `Ganache Local` (`127.0.0.1:7545`, Chain ID `1337`).

---

## 📜 License
Distributed under the MIT License. Created for major academic project and research purposes.
