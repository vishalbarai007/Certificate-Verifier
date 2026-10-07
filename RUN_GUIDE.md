# 🚀 Certificate Verifier — Complete Run & Operational Guide

This guide provides step-by-step instructions to run the **Blockchain-Based Academic Certificate Verification System** locally using **Hardhat**, **Solidity**, **MetaMask**, and **React (Vite)**.

---

## 📋 System Prerequisites

Before starting, ensure you have the following installed:

| Prerequisite | Recommended Version | Verification Command |
| :--- | :--- | :--- |
| **Node.js** | `v18.x` or `v20.x` or higher | `node -v` |
| **npm** | `v9.x` or higher | `npm -v` |
| **MetaMask** | Latest Browser Extension | [metamask.io](https://metamask.io/) |
| **Git** | Any modern release | `git --version` |

---

## 🏗️ Architecture at Runtime

```
+-------------------------------------------------------------+
|                     Browser Client                          |
|         React + Vite Frontend (http://localhost:8080)        |
+-------------------------------------------------------------+
         |                                           ^
         | EIP-1193 (Transactions)                   | JsonRpcProvider (Read)
         v                                           |
+-------------------+                       +-----------------+
| MetaMask Extension|                       |  Hardhat Node   |
| (Account #0 Admin)|                       | 127.0.0.1:8545  |
+-------------------+                       | Chain ID: 31337 |
         |                                  +-----------------+
         | Signed TX                                 ^
         +-------------------------------------------+
               CertificateVerification.sol
```

The system comprises three concurrent parts:
1. **Hardhat Node**: An in-memory local Ethereum blockchain running on `http://127.0.0.1:8545`.
2. **Smart Contract**: `CertificateVerification.sol` compiled & deployed to the Hardhat node.
3. **Frontend Application**: Vite dev server serving the web interface on `http://localhost:8080`.

---

## ⚡ Quick Start: 3 Terminal Workflow

To run the complete system, open **3 terminal windows** in the project root directory:

### Terminal 1: Start Hardhat Blockchain Node
```bash
npm run hardhat:node
```
> [!NOTE]
> This starts a local Ethereum node at `http://127.0.0.1:8545` (Chain ID `31337`).  
> Hardhat automatically prints 20 pre-funded test accounts with 10,000 ETH each. **Keep this terminal running.**

---

### Terminal 2: Compile & Deploy Smart Contract
```bash
# 1. Compile Solidity contracts
npm run hardhat:compile

# 2. Deploy to the local Hardhat node
npm run hardhat:deploy
```

> [!TIP]
> The automated deployment script (`scripts/deploy.js`):
> - Deploys `CertificateVerification.sol` using Hardhat Account #0.
> - Automatically updates `DEFAULT_CONTRACT_ADDRESS`, `ADMIN_WALLET_ADDRESS`, and the ABI in [`src/lib/blockchain.ts`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/src/lib/blockchain.ts).
> - Writes a snapshot of deployment details to [`src/lib/deployment.json`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/src/lib/deployment.json).
> - You **do not** need to copy-paste contract addresses manually!

---

### Terminal 3: Launch Vite Frontend Dev Server
```bash
npm run dev
```
> [!NOTE]
> The application will be accessible at:  
> **👉 `http://localhost:8080`**

---

## 🦊 MetaMask Configuration Guide

To interact with the smart contract as an **Institution Admin**, configure MetaMask to connect to your local Hardhat node.

### Step 1: Add the Hardhat Local Network
1. Open the MetaMask extension.
2. Click the network selector in the top-left corner and click **Add Network** (or go to **Settings > Networks > Add a Network Manually**).
3. Fill in the network parameters:
   - **Network Name**: `Hardhat Local`
   - **New RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
4. Click **Save** and switch to `Hardhat Local`.

### Step 2: Import Hardhat Account #0 (Contract Admin)
Hardhat Account #0 is designated as the contract deployer and administrator. Import its private key:

1. In MetaMask, click your account avatar / dropdown.
2. Select **Import Account**.
3. Choose **Private Key** and paste:
   ```text
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
4. Click **Import**.

> [!IMPORTANT]
> - **Imported Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
> - **Initial Balance**: `10,000 ETH`
> - This account is registered as the contract owner (`admin`) and has permission to register students and mint certificates.

---

## 🧪 Testing the End-to-End Workflow

### 1️⃣ Institution Admin Portal (`/admin`)
1. Navigate to `http://localhost:8080/admin`.
2. Click **Connect MetaMask Wallet** (ensure Account #0 is selected).  
   *(Alternative: Click **Preview in Evaluator Mode** to explore without MetaMask).*
3. **Register a Student**:
   - Go to the **Register Student** card.
   - Enter Enrollment Number: `2024CS101`
   - Enter Full Name: `Jane Doe`
   - Enter Email: `janedoe@university.edu`
   - Enter Department: `Computer Engineering`
   - Enter Batch Year: `2020-2024`
   - Click **Submit Registration** and confirm the transaction in MetaMask.
4. **Issue a Certificate**:
   - Go to the **Issue Certificate** card.
   - Enter Enrollment Number: `2024CS101` (student details will auto-fill from the blockchain).
   - Enter Degree/Course: `Bachelor of Computer Engineering`
   - Enter Institution: `Metropolitan University of Technology`
   - The platform auto-computes the **SHA-256 Hash** and assigns a unique serial number (`CERT-2026-XXXX`).
   - Click **Issue Certificate on Blockchain** and confirm the transaction in MetaMask.
   - Copy the generated **Certificate Hash** for verification testing.

---

### 2️⃣ Student Credential Portal (`/student`)
1. Navigate to `http://localhost:8080/student`.
2. Log in using student credentials:
   - **Enrollment Number**: `2024CS101`
   - **Passkey**: `0777` *(or use demo student credentials)*
3. View the student dashboard displaying the blockchain-issued degree.
4. Actions available:
   - **View Certificate**: Inspect the high-resolution parchment certificate.
   - **Download PDF**: Generate and download an official PDF document with the verification QR code embedded.
   - **View / Save QR**: Download high-correction verification QR image.

---

### 3️⃣ Public Verification Portal (`/verify` or `/`)
1. Navigate to `http://localhost:8080/verify` (or use the verification widget on the home page).
2. Anyone (employers, agencies, universities) can verify credentials **without logging in and without paying gas**:
   - **Option A (Hash Lookup)**: Paste the SHA-256 Certificate Hash and click **Verify Authenticity**.
   - **Option B (QR Code Upload / Scan)**: Upload a certificate image or scan via camera.
3. The contract validates the cryptographic hash on-chain and displays:
   - Authenticity Status: `✓ AUTHENTIC CERTIFICATE`
   - Student Name, Enrollment Number, Course, Institution
   - Issuing Authority Wallet Address
   - Exact Block Timestamp & Issue Date

---

## 🛠️ Complete Scripts Reference

All commands are defined in [`package.json`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/package.json):

| Command | Action |
| :--- | :--- |
| `npm run hardhat:node` | Starts the local Hardhat EVM blockchain node on port `8545` |
| `npm run hardhat:compile` | Compiles `contracts/CertificateVerification.sol` via Hardhat |
| `npm run hardhat:deploy` | Deploys the contract, updates `blockchain.ts` & saves `deployment.json` |
| `npm run dev` | Starts Vite frontend dev server at `http://localhost:8080` |
| `npm run build` | Builds optimized production frontend bundle in `dist/` |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs ESLint check across all TypeScript/React source files |

---

## ❓ Troubleshooting & FAQs

### 1. MetaMask Error: `Nonce too high` or `Transaction failed`
- **Cause**: Hardhat node was restarted, resetting the blockchain state to block 0 while MetaMask retains the old transaction nonces.
- **Fix**: In MetaMask:
  1. Click **Account Avatar > Settings > Advanced**.
  2. Click **Clear activity and nonce data** (or **Reset Account**).
  3. Re-send your transaction.

### 2. Redeploying After Restarting Hardhat Node
- Whenever you stop and restart `npm run hardhat:node`, the in-memory chain is wiped.
- Simply run:
  ```bash
  npm run hardhat:deploy
  ```
- The deployment script will automatically re-deploy and update `src/lib/blockchain.ts` with the new address.

### 3. `Failed to connect to local node at http://127.0.0.1:8545`
- Ensure that Terminal 1 running `npm run hardhat:node` is active and hasn't crashed or terminated.
- Check that no other process is occupying port `8545`:
  ```bash
  lsof -i :8545
  ```

### 4. `Artifact not found at artifacts/contracts/...`
- Run compile before deploying:
  ```bash
  npm run hardhat:compile
  npm run hardhat:deploy
  ```

### 5. MetaMask prompts to switch chain automatically
- The frontend includes automatic EIP-3326 chain switching logic. When you click **Connect Wallet**, it will prompt you to switch or add `Hardhat Local (Chain ID 31337)`. Click **Approve / Switch**.
