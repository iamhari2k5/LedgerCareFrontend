import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'ledgercare_secret_key_2026',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  blockchain: {
    rpcUrl: process.env.BLOCKCHAIN_RPC_URL || 'http://127.0.0.1:8545',
    chainId: Number(process.env.BLOCKCHAIN_CHAIN_ID || 31337),
    privateKey: process.env.BLOCKCHAIN_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    charityRegistryAddress: process.env.CHARITY_REGISTRY_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    campaignManagerAddress: process.env.CAMPAIGN_MANAGER_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    donationLedgerAddress: process.env.DONATION_LEDGER_ADDRESS || '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    fundTrackerAddress: process.env.FUND_TRACKER_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    evidenceRegistryAddress: process.env.EVIDENCE_REGISTRY_ADDRESS || '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  },
  ipfs: {
    mode: process.env.IPFS_MODE || 'mock',
  }
};

export default config;
