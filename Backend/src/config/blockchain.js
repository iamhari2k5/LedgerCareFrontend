export const charityRegistryAbi = [
  "event CharityRegistered(uint256 indexed charityId, string organizationName, address indexed walletAddress, uint256 timestamp)",
  "event CharityVerified(uint256 indexed charityId, uint256 timestamp)",
  "function registerCharity(string organizationName, string registrationNumber, string email) external",
  "function verifyCharity(uint256 charityId) external",
  "function getCharity(uint256 charityId) external view returns (tuple(uint256 charityId, string organizationName, string registrationNumber, string email, address walletAddress, bool verified, uint256 registeredAt))"
];

export const campaignManagerAbi = [
  "event CampaignCreated(uint256 indexed campaignId, uint256 indexed charityId, address indexed charityWallet, string title, uint256 targetAmount)",
  "event CampaignCompleted(uint256 indexed campaignId)",
  "function createCampaign(uint256 charityId, string title, string description, uint256 targetAmount, uint256 startDate, uint256 endDate) external",
  "function getCampaign(uint256 campaignId) external view returns (tuple(uint256 campaignId, uint256 charityId, address charityWallet, string title, string description, uint256 targetAmount, uint256 raisedAmount, uint256 startDate, uint256 endDate, uint8 status))"
];

export const donationLedgerAbi = [
  "event DonationReceived(uint256 indexed donationId, uint256 indexed campaignId, address indexed donor, uint256 amount, uint256 timestamp)",
  "event FiatDonationRecorded(uint256 indexed donationId, uint256 indexed campaignId, address indexed donor, uint256 amountInFiat, string paymentReference, uint256 timestamp)",
  "function donate(uint256 campaignId) external payable",
  "function recordFiatDonation(uint256 campaignId, address donor, uint256 amountInFiat, string paymentReference) external",
  "function getDonation(uint256 donationId) external view returns (tuple(uint256 donationId, uint256 campaignId, address donor, uint256 amount, uint256 timestamp))"
];

export const fundTrackerAbi = [
  "event FundAllocated(uint256 indexed allocationId, uint256 indexed campaignId, address indexed recipient, uint256 amount, string purpose)",
  "function recordAllocation(uint256 campaignId, address recipient, uint256 amount, string purpose) external",
  "function getAllocation(uint256 allocationId) external view returns (tuple(uint256 allocationId, uint256 campaignId, address recipient, uint256 amount, string purpose, uint256 timestamp))"
];

export const evidenceRegistryAbi = [
  "event EvidenceRegistered(uint256 indexed evidenceId, uint256 indexed campaignId, bytes32 fileHash, string fileName, uint256 timestamp)",
  "function registerEvidence(uint256 campaignId, bytes32 fileHash, string fileName) external",
  "function verifyEvidence(uint256 evidenceId, bytes32 providedHash) external view returns (bool)"
];
