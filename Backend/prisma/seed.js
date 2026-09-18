import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // Clean existing tables
  await prisma.blockchainEvent.deleteMany({});
  await prisma.evidence.deleteMany({});
  await prisma.fundAllocation.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.campaign.deleteMany({});
  await prisma.charityProfile.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Default Users
  const donorPass = await bcrypt.hash('donor123', 10);
  const charityPass = await bcrypt.hash('charity123', 10);

  const donorUser = await prisma.user.create({
    data: {
      name: 'Demo Donor',
      email: 'donor@ledgercare.org',
      password: donorPass,
      role: 'DONOR'
    }
  });

  const charityUsers = [];
  const charityNames = [
    'Hope Foundation',
    'Seva Collective',
    'Jal Jeevan Trust',
    'Nayi Disha Foundation',
    'Green Shore Trust'
  ];

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: charityNames[i],
        email: `contact@${charityNames[i].toLowerCase().replace(/\s+/g, '')}.org`,
        password: charityPass,
        role: 'CHARITY'
      }
    });
    charityUsers.push(user);
  }

  // 2. Create 5 Charities
  const charities = [];
  const walletAddrs = [
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
  ];

  for (let i = 0; i < 5; i++) {
    const id = `CH00${i + 1}`;
    const charity = await prisma.charityProfile.create({
      data: {
        id,
        userId: charityUsers[i].id,
        organizationName: charityNames[i],
        registrationNumber: `REG/202${i + 1}/MH/00${i + 1}`,
        email: charityUsers[i].email,
        walletAddress: walletAddrs[i],
        verificationStatus: 'VALIDATED',
        blockchainCharityId: i + 1,
        blockchainTxHash: `0x2ac4e191df028f3a91bca43d72e1b9120ac477fd21aae91c4b025ab312cfd0${i + 1}`
      }
    });
    charities.push(charity);
  }

  // 3. Create 8 Campaigns
  const campaignDefs = [
    { title: 'Education Support Program', cat: 'Education', target: 1000000, raised: 725000, alloc: 480000, util: 365000, accent: 'violet', status: 'Active' },
    { title: 'Rural Healthcare Access', cat: 'Healthcare', target: 650000, raised: 480000, alloc: 310000, util: 218000, accent: 'cyan', status: 'Active' },
    { title: 'Clean Water for Vidarbha', cat: 'Community', target: 1200000, raised: 910000, alloc: 700000, util: 550000, accent: 'amber', status: 'Active' },
    { title: "Women's Livelihood Collective", cat: 'Livelihood', target: 500000, raised: 340000, alloc: 220000, util: 156000, accent: 'violet', status: 'Active' },
    { title: 'Coastal Mangrove Restoration', cat: 'Environment', target: 600000, raised: 600000, alloc: 510000, util: 440000, accent: 'cyan', status: 'Completed' },
    { title: 'Tribal Nutrition Drive', cat: 'Healthcare', target: 400000, raised: 250000, alloc: 180000, util: 120000, accent: 'amber', status: 'Active' },
    { title: 'Solar Power for Village Schools', cat: 'Community', target: 850000, raised: 500000, alloc: 350000, util: 280000, accent: 'violet', status: 'Active' },
    { title: 'Disaster Relief Preparedness', cat: 'Community', target: 700000, raised: 450000, alloc: 300000, util: 200000, accent: 'cyan', status: 'Active' }
  ];

  const campaigns = [];
  for (let i = 0; i < 8; i++) {
    const cDef = campaignDefs[i];
    const charity = charities[i % 5];
    const id = `CMP00${i + 1}`;

    const campaign = await prisma.campaign.create({
      data: {
        id,
        charityId: charity.id,
        title: cDef.title,
        description: `${cDef.title} initiative providing direct transparent impact and verified spending.`,
        category: cDef.cat,
        targetAmount: cDef.target,
        raisedAmount: cDef.raised,
        allocatedAmount: cDef.alloc,
        utilizedAmount: cDef.util,
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        status: cDef.status,
        accent: cDef.accent,
        blockchainCampaignId: i + 1,
        blockchainTxHash: `0x8f3a91bca43d72e1b9120ac477fd21aae91c4b025ab312cfd02e88a1fc7819d${i + 1}`
      }
    });
    campaigns.push(campaign);
  }

  // 4. Create 15 Payments & 15 Donations
  const donationAmounts = [
    5000, 10000, 2500, 7500, 5000, 12000, 3500, 8000,
    15000, 6000, 20000, 4500, 9000, 11000, 8500
  ];

  for (let i = 0; i < 15; i++) {
    const donId = `DON${String(i + 1).padStart(3, '0')}`;
    const payRef = `PAY${12345 + i}`;
    const campaign = campaigns[i % 8];

    await prisma.payment.create({
      data: {
        id: `PAY${String(i + 1).padStart(3, '0')}`,
        paymentReference: payRef,
        amount: donationAmounts[i],
        currency: 'INR',
        paymentMethod: 'SIMULATED_FIAT',
        status: 'SUCCESS'
      }
    });

    await prisma.donation.create({
      data: {
        id: donId,
        campaignId: campaign.id,
        donorId: donorUser.id,
        amount: donationAmounts[i],
        currency: 'INR',
        paymentReference: payRef,
        paymentStatus: 'SUCCESS',
        blockchainStatus: 'RECORDED',
        blockchainDonationId: i + 1,
        blockchainTxHash: `0x91df02ab43d72e1b9120ac477fd21aae91c4b025ab312cfd02e88a1fc7819d${i + 1}`
      }
    });
  }

  // 5. Create 8 Fund Allocations
  const allocPurposes = [
    'Learning materials and textbooks',
    'Mobile clinic supplies and medicine',
    'Water filtration unit installations',
    'Sewing equipment and training kits',
    'Mangrove saplings and fencing',
    'High-protein nutrition supplements',
    'Solar panel array equipment',
    'Emergency medical response kits'
  ];

  for (let i = 0; i < 8; i++) {
    const allocId = `ALLOC00${i + 1}`;
    const c = campaigns[i];

    await prisma.fundAllocation.create({
      data: {
        id: allocId,
        campaignId: c.id,
        recipient: walletAddrs[i % 5],
        amount: c.allocatedAmount,
        purpose: allocPurposes[i],
        category: c.category,
        blockchainAllocationId: i + 1,
        blockchainTxHash: `0x77fd21aae91c4b025ab312cfd02e88a1fc7819d42ac4e191df028f3a91bca43${i + 1}`
      }
    });
  }

  // 6. Create 10 Evidence Records
  const evidenceTypes = [
    'Invoice bundle',
    'Medicine receipts',
    'Installation report',
    'Training attendance',
    'Nursery inventory',
    'Distribution receipts',
    'Solar panel invoice',
    'Relief kit bill',
    'Audit compliance letter',
    'Vendor payment proof'
  ];

  for (let i = 0; i < 10; i++) {
    const evId = `EVD${String(i + 1).padStart(3, '0')}`;
    const c = campaigns[i % 8];

    await prisma.evidence.create({
      data: {
        id: evId,
        allocationId: `ALLOC00${(i % 8) + 1}`,
        campaignId: c.id,
        type: evidenceTypes[i],
        fileName: `evidence-doc-${i + 1}.pdf`,
        fileHash: `sha256:${['abc123', '91de40', 'f0a83b', '728cc1', '44ea92', '81ef20', 'c71b02', '55a901', '33d820', '11f922'][i]}...`,
        cid: `QmMockCharityEvidence00${i + 1}`,
        status: 'VERIFIED',
        blockchainEvidenceId: i + 1,
        blockchainTxHash: `0xe91c4b025ab312cfd02e88a1fc7819d42ac4e191df028f3a91bca43d72e1b91${i + 1}`
      }
    });
  }

  // 7. Create 20 Blockchain Events
  const eventTypes = [
    'CHARITY_REGISTERED', 'CHARITY_VALIDATED', 'CAMPAIGN_CREATED', 'DONATION_RECORDED',
    'FUNDS_ALLOCATED', 'FUNDS_UTILIZED', 'EVIDENCE_UPLOADED', 'EVIDENCE_VERIFIED',
    'DONATION_RECORDED', 'FUNDS_ALLOCATED', 'CAMPAIGN_CREATED', 'DONATION_RECORDED',
    'EVIDENCE_UPLOADED', 'EVIDENCE_VERIFIED', 'FUNDS_ALLOCATED', 'DONATION_RECORDED',
    'FUNDS_UTILIZED', 'CHARITY_REGISTERED', 'CHARITY_VALIDATED', 'CAMPAIGN_COMPLETED'
  ];

  const contracts = [
    'CharityRegistry', 'CharityRegistry', 'CampaignManager', 'DonationLedger',
    'FundTracker', 'FundTracker', 'EvidenceRegistry', 'EvidenceRegistry',
    'DonationLedger', 'FundTracker', 'CampaignManager', 'DonationLedger',
    'EvidenceRegistry', 'EvidenceRegistry', 'FundTracker', 'DonationLedger',
    'FundTracker', 'CharityRegistry', 'CharityRegistry', 'CampaignManager'
  ];

  for (let i = 0; i < 20; i++) {
    await prisma.blockchainEvent.create({
      data: {
        eventType: eventTypes[i],
        contract: contracts[i],
        entityId: i < 3 ? `CMP00${i + 1}` : i < 10 ? `DON00${i - 2}` : `EVD0${i - 9}`,
        blockNumber: 18420 + i * 12,
        transactionHash: `0x${['2ac4e1','91df02','8f3a91','a43d72','b9120a','77fd21','e91c4b','5ab312','d02e88','fc7819','a81c22','b9014d','fc234a','7db901','e81f20','8f3a91','91df02','2ac4e1','5ab312','fc7819'][i]}...`,
        eventData: JSON.stringify({ index: i + 1, status: 'CONFIRMED' })
      }
    });
  }

  console.log('Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
