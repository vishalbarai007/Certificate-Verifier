# 📖 User Guide & Operational Manual

This manual provides step-by-step walkthroughs for setting up, deploying, and operating **Certificate Verifier**.

---

## 1. Prerequisites & Environment Setup

### Software Requirements:
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**: Package manager
- **MetaMask**: Browser extension for Chrome / Firefox / Brave / Edge
- **Ganache**: Local Ethereum blockchain simulator (GUI or CLI)

---

## 2. Setting Up the Local Blockchain (Ganache)

1. Launch **Ganache** and select **Quickstart Workspace**.
2. Note the network parameters:
   - **RPC Server**: `HTTP://127.0.0.1:7545`
   - **Network ID**: `5777` or `1337`
3. Click the key icon on Account (0) in Ganache to view and copy the **Private Key**.

---

## 3. Configuring MetaMask

1. Open MetaMask and navigate to **Settings > Networks > Add a Network Manually**.
2. Enter the Ganache network credentials:
   - **Network Name**: `Ganache Local`
   - **New RPC URL**: `http://127.0.0.1:7545`
   - **Chain ID**: `1337` (or `5777` depending on Ganache version)
   - **Currency Symbol**: `ETH`
3. Click **Save**.
4. In MetaMask, click your account avatar, choose **Import Account**, and paste the **Private Key** copied from Ganache Account (0).
5. Your MetaMask wallet will now show a starting balance of **100 ETH**.

---

## 4. Deploying the Smart Contract (Remix IDE)

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new file named `CertificateVerification.sol`.
3. Copy the contract code from [`.sol`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/.sol) into Remix.
4. Go to the **Solidity Compiler** tab and select compiler version **0.8.19**. Click **Compile**.
5. Go to the **Deploy & Run Transactions** tab:
   - Under **Environment**, select **Injected Provider - MetaMask**.
   - Confirm that your imported Ganache account is selected.
   - Click **Deploy** and confirm the transaction in MetaMask.
6. Copy the newly deployed contract address (starts with `0x...`).
7. Update `DEFAULT_CONTRACT_ADDRESS` in [`src/lib/blockchain.ts`](file:///media/vishal-barai/New%20Volume/College-Projects/be-major-projects/BLOCKCHAIN-BASED-CERTIFICATE-VERIFICATION/src/lib/blockchain.ts) with this address.

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
