import { ethers } from 'ethers';

// Contract ABI - automatically extracted from compiled artifact
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "certificateHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "certificateNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "enrollmentNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "issueDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "issuerAddress",
        "type": "address"
      }
    ],
    "name": "CertificateIssued",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "certificateHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isValid",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "verificationTime",
        "type": "uint256"
      }
    ],
    "name": "CertificateVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "enrollmentNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "registrationDate",
        "type": "uint256"
      }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCertificateHashes",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllEnrollmentNumbers",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateHash",
        "type": "string"
      }
    ],
    "name": "getCertificate",
    "outputs": [
      {
        "internalType": "string",
        "name": "certificateNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "institution",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "issueYear",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "issueDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "issuerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mobileNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "department",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "batchYear",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "registrationDate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      }
    ],
    "name": "getStudentCertificates",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalCertificates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateNumber",
        "type": "string"
      }
    ],
    "name": "isCertificateNumberExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_certificateNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_institution",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_issueYear",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mobileNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_department",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_batchYear",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCertificates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateHash",
        "type": "string"
      }
    ],
    "name": "verifyCertificate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateHash",
        "type": "string"
      }
    ],
    "name": "verifyCertificateView",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "verifyStudentLogin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// ============================================
// CONFIGURATION - UPDATE THESE AFTER REDEPLOY
// ============================================

export const DEFAULT_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const ADMIN_WALLET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

// Ganache Network Configuration
export const GANACHE_RPC_URL = 'http://127.0.0.1:8545';
export const GANACHE_CHAIN_ID = 31337;
export const GANACHE_CHAIN_ID_HEX = '0x7a69';

export interface Certificate {
  certificateNumber: string;
  studentName: string;
  enrollmentNumber: string;
  course: string;
  institution: string;
  issueYear: number;
  issueDate: number;
  certificateHash: string;
  ipfsHash: string;
  issuerAddress: string;
}

export interface Student {
  name: string;
  email: string;
  mobileNumber: string;
  department: string;
  batchYear: string;
  isRegistered: boolean;
  registrationDate: number;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class BlockchainService {
  private provider:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | null = null;

  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private contractAddress = '';

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed! Please install MetaMask extension.');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No wallet account was approved in MetaMask.');
      }

      const approvedAccounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (!approvedAccounts || approvedAccounts.length === 0) {
        throw new Error('MetaMask did not expose any approved accounts.');
      }

      let chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to Chain ID:', chainId);

      if (chainId !== GANACHE_CHAIN_ID_HEX && chainId !== '0x539') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: GANACHE_CHAIN_ID_HEX }]
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: GANACHE_CHAIN_ID_HEX,
                  chainName: 'Hardhat Local',
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: [GANACHE_RPC_URL]
                }
              ]
            });
          } else {
            throw new Error('Please switch MetaMask to Hardhat local network (Chain ID 31337) manually.');
          }
        }

        chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chainId !== GANACHE_CHAIN_ID_HEX && chainId !== '0x539') {
          throw new Error('MetaMask is not connected to local node (Chain ID 31337).');
        }
      }

      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();

      const address = await this.signer.getAddress();
      console.log('Connected wallet address:', address);

      if (!address) {
        throw new Error('Failed to get connected wallet address.');
      }

      return address;
    } catch (error: any) {
      this.reset();
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  }

  isAdminWallet(walletAddress: string): boolean {
    return walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
  }

  async initContract(contractAddress: string): Promise<void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    this.contractAddress = contractAddress;
    this.contract = new ethers.Contract(contractAddress, CONTRACT_ABI, this.signer);
  }

  async isAdmin(): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.isAdmin();
  }

  async getAdminAddress(): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.admin();
  }

  async registerStudent(
    enrollmentNumber: string,
    name: string,
    email: string,
    mobileNumber: string,
    department: string,
    batchYear: string,
    password: string
  ): Promise<ethers.ContractTransaction> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    return await this.contract.registerStudent(
      enrollmentNumber,
      name,
      email,
      mobileNumber,
      department,
      batchYear,
      password
    );
  }

  async issueCertificate(
    certificateHash: string,
    certificateNumber: string,
    enrollmentNumber: string,
    studentName: string,
    course: string,
    institution: string,
    issueYear: number,
    ipfsHash: string = ''
  ): Promise<ethers.ContractTransaction> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    return await this.contract.issueCertificate(
      certificateHash,
      certificateNumber,
      enrollmentNumber,
      studentName,
      course,
      institution,
      issueYear,
      ipfsHash
    );
  }

  async verifyCertificate(certificateHash: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.verifyCertificateView(certificateHash);
  }

  async getCertificate(certificateHash: string): Promise<Certificate> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    const result = await this.contract.getCertificate(certificateHash);

    return {
      certificateNumber: result.certificateNumber,
      studentName: result.studentName,
      enrollmentNumber: result.enrollmentNumber,
      course: result.course,
      institution: result.institution,
      issueYear: result.issueYear.toNumber(),
      issueDate: result.issueDate.toNumber(),
      certificateHash,
      ipfsHash: result.ipfsHash,
      issuerAddress: result.issuerAddress
    };
  }

  async getStudent(enrollmentNumber: string): Promise<Student> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    const result = await this.contract.getStudent(enrollmentNumber);

    return {
      name: result.name,
      email: result.email,
      mobileNumber: result.mobileNumber,
      department: result.department,
      batchYear: result.batchYear,
      isRegistered: result.isRegistered,
      registrationDate: result.registrationDate.toNumber()
    };
  }

  async isCertificateNumberExists(certificateNumber: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.isCertificateNumberExists(certificateNumber);
  }

  async verifyStudentLogin(
    enrollmentNumber: string,
    password: string
  ): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.verifyStudentLogin(enrollmentNumber, password);
  }

  async getStudentCertificates(enrollmentNumber: string): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.getStudentCertificates(enrollmentNumber);
  }

  async getAllCertificateHashes(): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.getAllCertificateHashes();
  }

  async getAllEnrollmentNumbers(): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    return await this.contract.getAllEnrollmentNumbers();
  }

  async getTotalCertificates(): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    const total = await this.contract.getTotalCertificates();
    return total.toNumber();
  }

  getContractAddress(): string {
    return this.contractAddress;
  }

  async getConnectedAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }

  async getNetwork(): Promise<ethers.providers.Network | null> {
    if (!this.provider) return null;
    return await this.provider.getNetwork();
  }

  reset(): void {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.contractAddress = '';
  }
}

export const blockchainService = new BlockchainService();

// Generate certificate hash using SHA-256
export async function generateCertificateHash(data: {
  studentName: string;
  enrollmentNumber: string;
  course: string;
  institution: string;
  issueYear: number;
}): Promise<string> {
  const str = JSON.stringify(data) + Date.now().toString();
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return '0x' + hashHex;
}
