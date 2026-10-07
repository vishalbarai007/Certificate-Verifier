import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const rpcUrl = process.env.RPC_URL || 'http://127.0.0.1:8545';
  console.log(`Connecting to local node at ${rpcUrl}...`);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const signer = provider.getSigner(0);
  const deployerAddress = await signer.getAddress();
  console.log(`Deploying contracts with account: ${deployerAddress}`);

  const balance = await provider.getBalance(deployerAddress);
  console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);

  const artifactPath = path.resolve(__dirname, '../artifacts/contracts/CertificateVerification.sol/CertificateVerification.json');
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Artifact not found at ${artifactPath}. Please run hardhat compile first.`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const abi = artifact.abi;
  const bytecode = artifact.bytecode;

  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  console.log('Deploying CertificateVerification...');
  const contract = await factory.deploy();
  await contract.deployed();

  const contractAddress = contract.address;
  console.log(`CertificateVerification deployed successfully to: ${contractAddress}`);

  const adminAddress = await contract.admin();
  console.log(`Contract admin set to: ${adminAddress}`);

  // Update src/lib/blockchain.ts
  const blockchainTsPath = path.resolve(__dirname, '../src/lib/blockchain.ts');
  let blockchainTs = fs.readFileSync(blockchainTsPath, 'utf8');

  // Replace DEFAULT_CONTRACT_ADDRESS
  blockchainTs = blockchainTs.replace(
    /export const DEFAULT_CONTRACT_ADDRESS = ['"][^'"]+['"];/,
    `export const DEFAULT_CONTRACT_ADDRESS = '${contractAddress}';`
  );

  // Replace ADMIN_WALLET_ADDRESS
  blockchainTs = blockchainTs.replace(
    /export const ADMIN_WALLET_ADDRESS = ['"][^'"]+['"];/,
    `export const ADMIN_WALLET_ADDRESS = '${adminAddress}';`
  );

  // Update RPC URL and Chain ID if needed
  blockchainTs = blockchainTs.replace(
    /export const GANACHE_RPC_URL = ['"][^'"]+['"];/,
    `export const GANACHE_RPC_URL = 'http://127.0.0.1:8545';`
  );
  blockchainTs = blockchainTs.replace(
    /export const GANACHE_CHAIN_ID = \d+;/,
    `export const GANACHE_CHAIN_ID = 31337;`
  );
  blockchainTs = blockchainTs.replace(
    /export const GANACHE_CHAIN_ID_HEX = ['"][^'"]+['"];/,
    `export const GANACHE_CHAIN_ID_HEX = '0x7a69';`
  );

  // Update CONTRACT_ABI with the exact ABI from the artifact
  const formattedAbi = JSON.stringify(abi, null, 2);
  blockchainTs = blockchainTs.replace(
    /export const CONTRACT_ABI = \[[^\]]*\];|\/\/ Contract ABI - matches the updated Solidity contract\nexport const CONTRACT_ABI = \[[\s\S]*?\];/m,
    `// Contract ABI - automatically extracted from compiled artifact\nexport const CONTRACT_ABI = ${formattedAbi} as const;`
  );

  fs.writeFileSync(blockchainTsPath, blockchainTs, 'utf8');
  console.log(`Updated ${blockchainTsPath} with deployed address, ABI, admin wallet, and Hardhat network configs.`);

  // Also save deployment info to a JSON file for reference
  const deploymentInfo = {
    contractAddress,
    adminAddress,
    deployerAddress,
    network: 'hardhat',
    chainId: 31337,
    rpcUrl: 'http://127.0.0.1:8545',
    deployedAt: new Date().toISOString(),
    abi
  };

  const deploymentInfoPath = path.resolve(__dirname, '../src/lib/deployment.json');
  fs.writeFileSync(deploymentInfoPath, JSON.stringify(deploymentInfo, null, 2), 'utf8');
  console.log(`Saved deployment info to ${deploymentInfoPath}`);
}

main().catch((error) => {
  console.error('Deployment failed:', error);
  process.exit(1);
});
