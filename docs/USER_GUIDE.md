# 📖 User Guide & Operational Manual

This manual provides step-by-step walkthroughs for setting up, deploying, and operating **Certificate Verifier**.

---

## 1. Prerequisites & Environment Setup

### Software Requirements:
- **Node.js**: v18.0.0 or higher
- **npm**: Package manager
- **MetaMask**: Browser extension for Chrome / Firefox / Brave / Edge
- **Hardhat**: Local Ethereum development environment (installed locally via `package.json`)

---

## 2. Setting Up the Local Blockchain (Hardhat Node)

1. Open a terminal in the project root directory and start the local Hardhat blockchain node:
   ```bash
   npm run hardhat:node
   ```
2. The node runs at `http://127.0.0.1:8545` with **Chain ID 31337** and prints 20 pre-funded test accounts with 10,000 ETH each.
3. Keep this terminal open.

---

## 3. Configuring MetaMask

1. Open MetaMask and navigate to **Settings > Networks > Add a Network Manually**.
2. Enter the Hardhat network credentials:
   - **Network Name**: `Hardhat Local`
   - **New RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
3. Click **Save**.
4. In MetaMask, click your account avatar, choose **Import Account**, and paste the private key for Hardhat Account #0:
   ```text
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
   *(Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`)*
5. Your MetaMask wallet will now show a starting balance of **10,000 ETH** on `Hardhat Local`.

---

## 4. Compiling and Deploying the Smart Contract (Hardhat)

1. In a second terminal, compile the Solidity contracts:
   ```bash
   npm run hardhat:compile
   ```
2. Deploy the contract to your local Hardhat node:
   ```bash
   npm run hardhat:deploy
   ```
3. The deployment script (`scripts/deploy.js`):
   - Deploys `contracts/CertificateVerification.sol` to the local node.
   - Automatically synchronizes `DEFAULT_CONTRACT_ADDRESS` and `ADMIN_WALLET_ADDRESS` in `src/lib/blockchain.ts`.
   - Exports the contract ABI and records deployment metadata to `src/lib/deployment.json`.

---

## 5. System Operations & Roles

### 🏛️ 1. Institution Admin Workflow
1. Navigate to `/admin`.
2. Connect your MetaMask wallet (or select **Preview in Evaluator Mode** for testing).
3. **Register Student**:
   - Enter Enrollment Number (e.g. `2024CS101`).
   - Enter Full Name, Email, Department, and Batch Year.
   - Submit the transaction to store the student on the blockchain.
4. **Issue Certificate**:
   - Enter the student's Enrollment Number (student data will auto-populate).
   - Enter Degree/Course Name (e.g. `Bachelor of Computer Science`).
   - The system computes the SHA-256 hash and unique serial number.
   - Confirm the minting transaction in MetaMask.
   - The certificate is permanently sealed on the blockchain.

### 🎓 2. Student Workflow
1. Navigate to `/student`.
2. Enter your Enrollment Number (`2024CS101`) and password (`0777`).
3. View all credentials issued to your account.
4. Click **View Certificate** to inspect the high-resolution certificate parchment.
5. Click **Download PDF** to export a printable document with embedded QR code.
6. Click **View QR** to export your credential verification QR image.

### 🔍 3. Public Verification Workflow
1. Navigate to `/verify` (or use the search bar on `/`).
2. **Method A (Hash Lookup)**: Paste the certificate hash into the search box and click **Verify Authenticity**.
3. **Method B (QR Code Upload)**: Upload an image or photo of the certificate. The scanner decodes the QR code and queries the blockchain.
4. A green **✓ AUTHENTIC CERTIFICATE** banner appears displaying all cryptographically verified academic details, issuer wallet, and timestamp.
