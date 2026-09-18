export type Campaign = { id: string; title: string; charity: string; charityId: string; category: string; description: string; raised: number; target: number; allocated: number; utilized: number; status: 'Active' | 'Completed'; days: number; accent: string }
export type Donation = { id: string; campaignId: string; amount: number; paymentReference: string; timestamp: string; status: 'RECORDED'; transactionHash: string }
export type Allocation = { id: string; campaignId: string; amount: number; purpose: string; category: string; timestamp: string; transactionHash: string }
export type Evidence = { id: string; allocationId: string; campaignId: string; type: string; hash: string; cid: string; status: 'VERIFIED' | 'REJECTED'; timestamp: string }

export const campaigns: Campaign[] = [
  { id:'CMP001', title:'Education Support Program', charity:'Hope Foundation', charityId:'CH001', category:'Education', description:'Scholarships, learning kits, and safe classrooms for children in rural Maharashtra.', raised:725000, target:1000000, allocated:480000, utilized:365000, status:'Active', days:103, accent:'violet' },
  { id:'CMP002', title:'Rural Healthcare Access', charity:'Seva Collective', charityId:'CH002', category:'Healthcare', description:'Mobile clinics and essential medicines for underserved villages.', raised:480000, target:650000, allocated:310000, utilized:218000, status:'Active', days:61, accent:'cyan' },
  { id:'CMP003', title:'Clean Water for Vidarbha', charity:'Jal Jeevan Trust', charityId:'CH003', category:'Community', description:'Community water filtration and rainwater harvesting infrastructure.', raised:910000, target:1200000, allocated:700000, utilized:550000, status:'Active', days:42, accent:'amber' },
  { id:'CMP004', title:'Women&apos;s Livelihood Collective', charity:'Nayi Disha Foundation', charityId:'CH004', category:'Livelihood', description:'Tools and training that help women-owned microbusinesses grow.', raised:340000, target:500000, allocated:220000, utilized:156000, status:'Active', days:29, accent:'violet' },
  { id:'CMP005', title:'Coastal Mangrove Restoration', charity:'Green Shore Trust', charityId:'CH005', category:'Environment', description:'Restoring coastal ecosystems with local fishing communities.', raised:600000, target:600000, allocated:510000, utilized:440000, status:'Completed', days:0, accent:'cyan' },
]
export const donations: Donation[] = [
  ...['DON001','DON002','DON003','DON004','DON005','DON006','DON007','DON008'].map((id, i) => ({ id, campaignId: campaigns[i % campaigns.length].id, amount: [5000,10000,2500,7500,5000,12000,3500,8000][i], paymentReference:`PAY${12345+i}`, timestamp:`${i+2} days ago`, status:'RECORDED' as const, transactionHash:`0x${['8f3a91bc','a43d72e1','b9120ac4','77fd21aa','e91c4b02','5ab312cf','d02e88a1','fc7819d4'][i]}...` }))
]
export const allocations: Allocation[] = campaigns.map((c, i) => ({ id:`ALLOC00${i+1}`, campaignId:c.id, amount:c.allocated, purpose:['Learning materials','Mobile clinic supplies','Water filtration units','Sewing equipment','Mangrove saplings'][i], category:['Education','Healthcare','Infrastructure','Livelihood','Environment'][i], timestamp:`${i+1} weeks ago`, transactionHash:`0x${['a81c22ef','b9014d7a','fc234ab1','7db901aa','e81f203c'][i]}...` }))
export const evidence: Evidence[] = campaigns.map((c, i) => ({ id:`EVD00${i+1}`, allocationId:allocations[i].id, campaignId:c.id, type:['Invoice bundle','Medicine receipts','Installation report','Training attendance','Nursery inventory'][i], hash:`sha256:${['abc123','91de40','f0a83b','728cc1','44ea92'][i]}...`, cid:`QmMockCharityEvidence00${i+1}`, status:'VERIFIED', timestamp:`${i+1} weeks ago` }))
export const events = ['CHARITY_REGISTERED','CHARITY_VALIDATED','CAMPAIGN_CREATED','DONATION_RECORDED','FUNDS_ALLOCATED','FUNDS_UTILIZED','EVIDENCE_UPLOADED','EVIDENCE_VERIFIED'].map((event, i) => ({ event, entityId: i < 3 ? `CMP00${i+1}` : i < 6 ? `DON00${i-2}` : `EVD00${i-5}`, block:18420+i*12, timestamp:`${i+1} days ago`, transactionHash:`0x${['2ac4e1','91df02','8f3a91','a43d72','b9120a','77fd21','e91c4b','5ab312'][i]}...`, status:'CONFIRMED' }))
export const money = (n:number) => `₹${n.toLocaleString('en-IN')}`
export const getCampaign = (id:string) => campaigns.find(c => c.id === id)
export const getDonation = (id:string) => donations.find(d => d.id === id)
export const simulatePayment = (campaignId:string, amount:number) => ({ id:`DON${String(donations.length+1).padStart(3,'0')}`, campaignId, amount, paymentReference:`PAY${Math.floor(10000+Math.random()*89999)}`, transactionHash:'0x8f3a91bc...91bc', status:'RECORDED' as const })
export const blockchainRecords = { charities:5, campaigns:8, donations:15, funds:8, evidence:10, events:20 }
export const contracts = ['CharityRegistry','CampaignManager','DonationLedger','FundTracker','EvidenceRegistry'].map((name,i)=>({name,address:`0x${['7A3f','91Bc','E2d1','4cA8','bF20'][i]}...${['91bc','4e21','0af2','8d10','cc41'][i]}`,network:'Hardhat Localhost',status:'CONNECTED',lastInteraction:`${i+1} min ago`}))
export const charities = ['Hope Foundation','Seva Collective','Jal Jeevan Trust','Nayi Disha Foundation','Green Shore Trust'].map((organization,i)=>({id:`CH00${i+1}`,organization,registrationNumber:`REG/202${i}/MH/00${i+1}`,documentHash:`sha256:${['c81a','d90b','e72f','a1bc','f031'][i]}...`,status:'VALIDATED'}))
export const charityStats = { campaigns:8, active:5, donations:15, received:3050000, allocated:2220000, utilized:1729000, pending:2, verified:10 }
export const getCampaignByDonation = (id:string) => { const d=getDonation(id); return d ? getCampaign(d.campaignId) : undefined }
export const getAllocations = (campaignId?:string) => campaignId ? allocations.filter(a=>a.campaignId===campaignId) : allocations
export const getEvidence = (campaignId?:string) => campaignId ? evidence.filter(e=>e.campaignId===campaignId) : evidence
export const getEvents = () => events
export const login = (email:string, role:'DONOR'|'CHARITY') => ({ email, role })
export const register = (data:Record<string,string>) => ({ id:'CH006', ...data, status:'VALIDATED' })
export const createCampaign = (data:Record<string,string>) => ({ id:'CMP009', ...data, status:'RECORDED', transactionHash:'0x8f3a...91bc' })
export const createAllocation = (data:Record<string,string>) => ({ id:'ALLOC009', ...data, status:'RECORDED' })
export const uploadEvidence = (data:Record<string,string>) => ({ id:'EVD011', ...data, hash:'sha256:abc123...', cid:'QmMockCharityEvidence001', status:'VERIFIED' })
export const verifyEvidence = (hash:string, expected:string) => hash === expected ? 'VERIFIED' : 'REJECTED'
export const getDonationTracking = (id:string) => ['Payment Completed','Donation Recorded','Funds Available','Funds Allocated','Funds Utilized','Evidence Uploaded','Evidence Hash Verified'].map((label,i)=>({label,status:i<5?'COMPLETED':i===5?'COMPLETED':'VERIFIED',relatedId:id,description:'Audit event recorded in the public transparency trail.',timestamp:`${i+1} days ago`,transactionHash:i>0?'0x8f3a...91bc':undefined}))
export const getBlockchainRecords = () => ({ charities, campaigns, donations, allocations, evidence })
export const api = { login, register, getCampaigns:()=>campaigns, getCampaign, createCampaign, simulatePayment, getDonations:()=>donations, getDonation, getDonationTracking, getAllocations, createAllocation, uploadEvidence, verifyEvidence, getBlockchainRecords, getEvents }
export const blockchain = { network:'Hardhat Localhost', chainId:31337, status:'DEMO / MOCK NETWORK' }
export default api
export type { Campaign as CampaignRecord }
