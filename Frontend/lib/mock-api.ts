export type Campaign = {
  id: string;
  title: string;
  charity: string;
  charityId: string;
  category: string;
  description: string;
  raised: number;
  target: number;
  allocated: number;
  utilized: number;
  status: 'Active' | 'Completed';
  days: number;
  accent: string;
};

export type Donation = {
  id: string;
  campaignId: string;
  amount: number;
  paymentReference: string;
  timestamp: string;
  status: 'RECORDED';
  transactionHash: string;
};

export type Allocation = {
  id: string;
  campaignId: string;
  amount: number;
  purpose: string;
  category: string;
  timestamp: string;
  transactionHash: string;
};

export type Evidence = {
  id: string;
  allocationId: string;
  campaignId: string;
  type: string;
  hash: string;
  cid: string;
  status: 'VERIFIED' | 'REJECTED';
  timestamp: string;
};

export const charities = [
  { id: 'CH001', organization: 'Hope Foundation', registrationNumber: 'REG/2026/MH/001', documentHash: 'sha256:c81a91...bc41', status: 'VALIDATED' },
  { id: 'CH002', organization: 'Seva Collective', registrationNumber: 'REG/2026/MH/002', documentHash: 'sha256:d90be7...4a21', status: 'VALIDATED' },
  { id: 'CH003', organization: 'Jal Jeevan Trust', registrationNumber: 'REG/2026/MH/003', documentHash: 'sha256:e7f2a1...91bc', status: 'VALIDATED' },
  { id: 'CH004', organization: 'Nayi Disha Foundation', registrationNumber: 'REG/2026/MH/004', documentHash: 'sha256:a1bcf0...310f', status: 'VALIDATED' },
  { id: 'CH005', organization: 'Green Shore Trust', registrationNumber: 'REG/2026/MH/005', documentHash: 'sha256:f0310a...8d12', status: 'VALIDATED' }
];

export const campaigns: Campaign[] = [
  { id: 'CMP001', title: 'Education Support Program', charity: 'Hope Foundation', charityId: 'CH001', category: 'Education', description: 'Scholarships, learning kits, and safe classrooms for children in rural Maharashtra.', raised: 725000, target: 1000000, allocated: 480000, utilized: 365000, status: 'Active', days: 103, accent: 'violet' },
  { id: 'CMP002', title: 'Rural Healthcare Access', charity: 'Seva Collective', charityId: 'CH002', category: 'Healthcare', description: 'Mobile clinics and essential medicines for underserved villages.', raised: 480000, target: 650000, allocated: 310000, utilized: 218000, status: 'Active', days: 61, accent: 'cyan' },
  { id: 'CMP003', title: 'Clean Water for Vidarbha', charity: 'Jal Jeevan Trust', charityId: 'CH003', category: 'Community', description: 'Community water filtration and rainwater harvesting infrastructure.', raised: 910000, target: 1200000, allocated: 700000, utilized: 550000, status: 'Active', days: 42, accent: 'amber' },
  { id: 'CMP004', title: "Women's Livelihood Collective", charity: 'Nayi Disha Foundation', charityId: 'CH004', category: 'Livelihood', description: 'Tools and training that help women-owned microbusinesses grow.', raised: 340000, target: 500000, allocated: 220000, utilized: 156000, status: 'Active', days: 29, accent: 'violet' },
  { id: 'CMP005', title: 'Coastal Mangrove Restoration', charity: 'Green Shore Trust', charityId: 'CH005', category: 'Environment', description: 'Restoring coastal ecosystems with local fishing communities.', raised: 600000, target: 600000, allocated: 510000, utilized: 440000, status: 'Completed', days: 0, accent: 'cyan' },
  { id: 'CMP006', title: 'Tribal Nutrition Drive', charity: 'Seva Collective', charityId: 'CH002', category: 'Healthcare', description: 'High-protein supplements and nutritional packs for tribal children.', raised: 250000, target: 400000, allocated: 180000, utilized: 120000, status: 'Active', days: 54, accent: 'amber' },
  { id: 'CMP007', title: 'Solar Power for Village Schools', charity: 'Hope Foundation', charityId: 'CH001', category: 'Community', description: 'Solar array installations bringing electricity to off-grid rural schools.', raised: 500000, target: 850000, allocated: 350000, utilized: 280000, status: 'Active', days: 88, accent: 'violet' },
  { id: 'CMP008', title: 'Disaster Relief Preparedness', charity: 'Jal Jeevan Trust', charityId: 'CH003', category: 'Community', description: 'Emergency medical supplies and food kits for flood-prone zones.', raised: 450000, target: 700000, allocated: 300000, utilized: 200000, status: 'Active', days: 15, accent: 'cyan' }
];

export const donations: Donation[] = [
  { id: 'DON001', campaignId: 'CMP001', amount: 5000, paymentReference: 'PAY12345', timestamp: '2 days ago', status: 'RECORDED', transactionHash: '0x8f3a91bc77fd21aa' },
  { id: 'DON002', campaignId: 'CMP002', amount: 10000, paymentReference: 'PAY12346', timestamp: '3 days ago', status: 'RECORDED', transactionHash: '0xa43d72e1e91c4b02' },
  { id: 'DON003', campaignId: 'CMP003', amount: 2500, paymentReference: 'PAY12347', timestamp: '4 days ago', status: 'RECORDED', transactionHash: '0xb9120ac45ab312cf' },
  { id: 'DON004', campaignId: 'CMP004', amount: 7500, paymentReference: 'PAY12348', timestamp: '5 days ago', status: 'RECORDED', transactionHash: '0x77fd21aad02e88a1' },
  { id: 'DON005', campaignId: 'CMP005', amount: 5000, paymentReference: 'PAY12349', timestamp: '6 days ago', status: 'RECORDED', transactionHash: '0xe91c4b02fc7819d4' },
  { id: 'DON006', campaignId: 'CMP006', amount: 12000, paymentReference: 'PAY12350', timestamp: '7 days ago', status: 'RECORDED', transactionHash: '0x5ab312cfa81c22ef' },
  { id: 'DON007', campaignId: 'CMP007', amount: 3500, paymentReference: 'PAY12351', timestamp: '8 days ago', status: 'RECORDED', transactionHash: '0xd02e88a1b9014d7a' },
  { id: 'DON008', campaignId: 'CMP008', amount: 8000, paymentReference: 'PAY12352', timestamp: '9 days ago', status: 'RECORDED', transactionHash: '0xfc7819d4fc234ab1' },
  { id: 'DON009', campaignId: 'CMP001', amount: 15000, paymentReference: 'PAY12353', timestamp: '10 days ago', status: 'RECORDED', transactionHash: '0xa81c22ef7db901aa' },
  { id: 'DON010', campaignId: 'CMP002', amount: 6000, paymentReference: 'PAY12354', timestamp: '11 days ago', status: 'RECORDED', transactionHash: '0xb9014d7ae81f203c' },
  { id: 'DON011', campaignId: 'CMP003', amount: 20000, paymentReference: 'PAY12355', timestamp: '12 days ago', status: 'RECORDED', transactionHash: '0xfc234ab18f3a91bc' },
  { id: 'DON012', campaignId: 'CMP004', amount: 4500, paymentReference: 'PAY12356', timestamp: '13 days ago', status: 'RECORDED', transactionHash: '0x7db901aaa43d72e1' },
  { id: 'DON013', campaignId: 'CMP005', amount: 9000, paymentReference: 'PAY12357', timestamp: '14 days ago', status: 'RECORDED', transactionHash: '0xe81f203cb9120ac4' },
  { id: 'DON014', campaignId: 'CMP006', amount: 11000, paymentReference: 'PAY12358', timestamp: '15 days ago', status: 'RECORDED', transactionHash: '0x2ac4e19177fd21aa' },
  { id: 'DON015', campaignId: 'CMP007', amount: 8500, paymentReference: 'PAY12359', timestamp: '16 days ago', status: 'RECORDED', transactionHash: '0x91df02abe91c4b02' }
];

export const allocations: Allocation[] = [
  { id: 'ALLOC001', campaignId: 'CMP001', amount: 480000, purpose: 'Learning materials and textbooks', category: 'Education', timestamp: '1 week ago', transactionHash: '0xa81c22ef7db901aa' },
  { id: 'ALLOC002', campaignId: 'CMP002', amount: 310000, purpose: 'Mobile clinic supplies and medicine', category: 'Healthcare', timestamp: '2 weeks ago', transactionHash: '0xb9014d7ae81f203c' },
  { id: 'ALLOC003', campaignId: 'CMP003', amount: 700000, purpose: 'Water filtration unit installations', category: 'Infrastructure', timestamp: '3 weeks ago', transactionHash: '0xfc234ab18f3a91bc' },
  { id: 'ALLOC004', campaignId: 'CMP004', amount: 220000, purpose: 'Sewing equipment and training kits', category: 'Livelihood', timestamp: '4 weeks ago', transactionHash: '0x7db901aaa43d72e1' },
  { id: 'ALLOC005', campaignId: 'CMP005', amount: 510000, purpose: 'Mangrove saplings and fencing', category: 'Environment', timestamp: '5 weeks ago', transactionHash: '0xe81f203cb9120ac4' },
  { id: 'ALLOC006', campaignId: 'CMP006', amount: 180000, purpose: 'High-protein nutrition supplements', category: 'Healthcare', timestamp: '6 weeks ago', transactionHash: '0x8f3a91bc77fd21aa' },
  { id: 'ALLOC007', campaignId: 'CMP007', amount: 350000, purpose: 'Solar panel array equipment', category: 'Infrastructure', timestamp: '7 weeks ago', transactionHash: '0xa43d72e1e91c4b02' },
  { id: 'ALLOC008', campaignId: 'CMP008', amount: 300000, purpose: 'Emergency medical response kits', category: 'Relief', timestamp: '8 weeks ago', transactionHash: '0xb9120ac45ab312cf' }
];

export const evidence: Evidence[] = [
  { id: 'EVD001', allocationId: 'ALLOC001', campaignId: 'CMP001', type: 'Invoice bundle', hash: 'sha256:abc12391de40f0a83b', cid: 'QmMockCharityEvidence001', status: 'VERIFIED', timestamp: '1 week ago' },
  { id: 'EVD002', allocationId: 'ALLOC002', campaignId: 'CMP002', type: 'Medicine receipts', hash: 'sha256:91de40f0a83b728cc1', cid: 'QmMockCharityEvidence002', status: 'VERIFIED', timestamp: '2 weeks ago' },
  { id: 'EVD003', allocationId: 'ALLOC003', campaignId: 'CMP003', type: 'Installation report', hash: 'sha256:f0a83b728cc144ea92', cid: 'QmMockCharityEvidence003', status: 'VERIFIED', timestamp: '3 weeks ago' },
  { id: 'EVD004', allocationId: 'ALLOC004', campaignId: 'CMP004', type: 'Training attendance', hash: 'sha256:728cc144ea9281ef20', cid: 'QmMockCharityEvidence004', status: 'VERIFIED', timestamp: '4 weeks ago' },
  { id: 'EVD005', allocationId: 'ALLOC005', campaignId: 'CMP005', type: 'Nursery inventory', hash: 'sha256:44ea9281ef20c71b02', cid: 'QmMockCharityEvidence005', status: 'VERIFIED', timestamp: '5 weeks ago' },
  { id: 'EVD006', allocationId: 'ALLOC006', campaignId: 'CMP006', type: 'Distribution receipts', hash: 'sha256:81ef20c71b0255a901', cid: 'QmMockCharityEvidence006', status: 'VERIFIED', timestamp: '6 weeks ago' },
  { id: 'EVD007', allocationId: 'ALLOC007', campaignId: 'CMP007', type: 'Solar panel invoice', hash: 'sha256:c71b0255a90133d820', cid: 'QmMockCharityEvidence007', status: 'VERIFIED', timestamp: '7 weeks ago' },
  { id: 'EVD008', allocationId: 'ALLOC008', campaignId: 'CMP008', type: 'Relief kit bill', hash: 'sha256:55a90133d82011f922', cid: 'QmMockCharityEvidence008', status: 'VERIFIED', timestamp: '8 weeks ago' },
  { id: 'EVD009', allocationId: 'ALLOC001', campaignId: 'CMP001', type: 'Audit compliance letter', hash: 'sha256:33d82011f92277aa01', cid: 'QmMockCharityEvidence009', status: 'VERIFIED', timestamp: '9 weeks ago' },
  { id: 'EVD010', allocationId: 'ALLOC002', campaignId: 'CMP002', type: 'Vendor payment proof', hash: 'sha256:11f92277aa0199bb02', cid: 'QmMockCharityEvidence010', status: 'VERIFIED', timestamp: '10 weeks ago' }
];

export const events = [
  'CHARITY_REGISTERED', 'CHARITY_VALIDATED', 'CAMPAIGN_CREATED', 'DONATION_RECORDED',
  'FUNDS_ALLOCATED', 'FUNDS_UTILIZED', 'EVIDENCE_UPLOADED', 'EVIDENCE_VERIFIED',
  'DONATION_RECORDED', 'FUNDS_ALLOCATED', 'CAMPAIGN_CREATED', 'DONATION_RECORDED',
  'EVIDENCE_UPLOADED', 'EVIDENCE_VERIFIED', 'FUNDS_ALLOCATED', 'DONATION_RECORDED',
  'FUNDS_UTILIZED', 'CHARITY_REGISTERED', 'CHARITY_VALIDATED', 'CAMPAIGN_COMPLETED'
].map((event, i) => ({
  event,
  entityId: i < 3 ? `CMP00${i + 1}` : i < 10 ? `DON00${i - 2}` : `EVD00${i - 9}`,
  block: 18420 + i * 12,
  timestamp: `${i + 1} days ago`,
  transactionHash: `0x${['2ac4e191', '91df02ab', '8f3a91bc', 'a43d72e1', 'b9120ac4', '77fd21aa', 'e91c4b02', '5ab312cf', 'd02e88a1', 'fc7819d4', 'a81c22ef', 'b9014d7a', 'fc234ab1', '7db901aa', 'e81f203c', '8f3a91bc', '91df02ab', '2ac4e191', '5ab312cf', 'fc7819d4'][i]}...`,
  status: 'CONFIRMED'
}));

export const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;
export const getCampaign = (id: string) => campaigns.find(c => c.id === id);
export const getDonation = (id: string) => donations.find(d => d.id === id);

export const simulatePayment = (campaignId: string, amount: number) => ({
  id: `DON${String(donations.length + 1).padStart(3, '0')}`,
  campaignId,
  amount,
  paymentReference: `PAY${Math.floor(10000 + Math.random() * 89999)}`,
  transactionHash: '0x8f3a91bc77fd21aae91c4b025ab312cfd02e88a1',
  status: 'RECORDED' as const
});

export const blockchainRecords = {
  charities: charities.length,
  campaigns: campaigns.length,
  donations: donations.length,
  funds: allocations.length,
  evidence: evidence.length,
  events: events.length
};

export const contracts = [
  { name: 'CharityRegistry', address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '1 min ago' },
  { name: 'CampaignManager', address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '2 min ago' },
  { name: 'DonationLedger', address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '3 min ago' },
  { name: 'FundTracker', address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '4 min ago' },
  { name: 'EvidenceRegistry', address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '5 min ago' }
];

export const totalReceivedSum = campaigns.reduce((sum, c) => sum + c.raised, 0);
export const totalAllocatedSum = campaigns.reduce((sum, c) => sum + c.allocated, 0);
export const totalUtilizedSum = campaigns.reduce((sum, c) => sum + c.utilized, 0);
export const totalUnallocatedSum = Math.max(0, totalReceivedSum - totalAllocatedSum);
export const totalAllocatedUnusedSum = Math.max(0, totalAllocatedSum - totalUtilizedSum);

export const charityStats = {
  campaigns: campaigns.length,
  active: campaigns.filter(c => c.status === 'Active').length,
  donations: donations.length,
  received: totalReceivedSum,
  allocated: totalAllocatedSum,
  utilized: totalUtilizedSum,
  pending: 2,
  verified: evidence.length
};

export const getCampaignByDonation = (id: string) => {
  const d = getDonation(id);
  return d ? getCampaign(d.campaignId) : undefined;
};

export const getAllocations = (campaignId?: string) => campaignId ? allocations.filter(a => a.campaignId === campaignId) : allocations;
export const getEvidence = (campaignId?: string) => campaignId ? evidence.filter(e => e.campaignId === campaignId) : evidence;
export const getEvents = () => events;

export const login = (email: string, role: 'DONOR' | 'CHARITY') => ({ email, role });
export const register = (data: Record<string, string>) => ({ id: 'CH006', ...data, status: 'VALIDATED' });
export const createCampaign = (data: Record<string, any>) => ({ id: 'CMP009', ...data, status: 'RECORDED', transactionHash: '0x8f3a91bc77fd21aa' });
export const createAllocation = (data: Record<string, any>) => ({ id: 'ALLOC009', ...data, status: 'RECORDED' });
export const uploadEvidence = (data: Record<string, any>) => ({ id: 'EVD011', ...data, hash: 'sha256:abc12391de40f0a83b', cid: 'QmMockCharityEvidence011', status: 'VERIFIED' });
export const verifyEvidence = (hash: string, expected: string) => hash === expected ? 'VERIFIED' : 'REJECTED';

export const getDonationTracking = (id: string) => [
  { label: 'Payment Completed', status: 'COMPLETED', relatedId: id, description: 'Simulated fiat payment processed successfully.', timestamp: 'Just now' },
  { label: 'Donation Recorded', status: 'COMPLETED', relatedId: id, description: 'Donation metadata created in system ledger.', timestamp: 'Just now', transactionHash: '0x8f3a91bc77fd21aa' },
  { label: 'Funds Available', status: 'COMPLETED', relatedId: id, description: 'Funds added to campaign balance.', timestamp: 'Just now' },
  { label: 'Funds Allocated', status: 'COMPLETED', relatedId: id, description: 'Charity allocated funds for project delivery.', timestamp: '1 week ago' },
  { label: 'Funds Utilized', status: 'COMPLETED', relatedId: id, description: 'Expenditure executed by charity.', timestamp: '2 weeks ago' },
  { label: 'Evidence Uploaded', status: 'COMPLETED', relatedId: id, description: 'Invoice / proof uploaded to IPFS.', timestamp: '3 weeks ago' },
  { label: 'Evidence Hash Verified', status: 'VERIFIED', relatedId: id, description: 'On-chain SHA-256 hash verified.', timestamp: '3 weeks ago', transactionHash: '0x91df02ab43d72e1b' }
];

export const getBlockchainRecords = () => ({ charities, campaigns, donations, allocations, evidence });
export const blockchain = { network: 'Hardhat Localhost', chainId: 31337, status: 'LIVE LOCAL BLOCKCHAIN' };

export const api = {
  login,
  register,
  getCampaigns: () => campaigns,
  getCampaign,
  createCampaign,
  simulatePayment,
  getDonations: () => donations,
  getDonation,
  getDonationTracking,
  getAllocations,
  createAllocation,
  uploadEvidence,
  verifyEvidence,
  getBlockchainRecords,
  getEvents
};

export default api;
export type { Campaign as CampaignRecord };
