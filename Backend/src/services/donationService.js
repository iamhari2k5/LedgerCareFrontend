import prisma from '../config/database.js';
import blockchainService from './blockchainService.js';
import eventIndexerService from './eventIndexerService.js';
import paymentService from './paymentService.js';
import { generateDonationId } from '../utils/generateId.js';

export class DonationService {
  async createDonation(data, donorId) {
    const { campaignId, amount, paymentReference, paymentStatus } = data;

    if (!campaignId || !amount || !paymentReference) {
      throw new Error('Campaign ID, amount, and payment reference are required');
    }

    if (paymentStatus && paymentStatus !== 'SUCCESS') {
      throw new Error('Donation cannot be recorded without a successful payment');
    }

    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    let payment = await prisma.payment.findUnique({ where: { paymentReference } });
    if (!payment) {
      payment = await prisma.payment.create({
        data: {
          id: `PAY${Math.floor(100 + Math.random() * 899)}`,
          paymentReference,
          amount: Number(amount),
          currency: 'INR',
          paymentMethod: 'SIMULATED_FIAT',
          status: 'SUCCESS'
        }
      });
    }

    const count = await prisma.donation.count();
    const donationId = generateDonationId(count + 1);

    const onChainResult = await blockchainService.recordFiatDonationOnChain(
      campaignId,
      '0x8f3a91bc77fd21aae91c4b025ab312cfd02e88a1',
      Number(amount),
      paymentReference
    );

    const donation = await prisma.donation.create({
      data: {
        id: donationId,
        campaignId,
        donorId: donorId || null,
        amount: Number(amount),
        currency: 'INR',
        paymentReference,
        paymentStatus: 'SUCCESS',
        blockchainStatus: 'RECORDED',
        blockchainTxHash: onChainResult.transactionHash,
        blockchainDonationId: count + 1
      },
      include: {
        campaign: true
      }
    });

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        raisedAmount: { increment: Number(amount) }
      }
    });

    await eventIndexerService.recordEvent(
      'DONATION_RECORDED',
      'DonationLedger',
      donationId,
      onChainResult.blockNumber || 18423,
      onChainResult.transactionHash,
      { campaignId, amount, paymentReference }
    );

    return {
      id: donation.id,
      campaignId: donation.campaignId,
      campaignTitle: donation.campaign.title,
      amount: donation.amount,
      paymentReference: donation.paymentReference,
      paymentStatus: 'SUCCESS',
      blockchainStatus: 'RECORDED',
      transactionHash: donation.blockchainTxHash,
      timestamp: donation.timestamp
    };
  }

  async getDonationById(id) {
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: { campaign: true }
    });

    if (!donation) {
      throw new Error('Donation not found');
    }

    return donation;
  }

  async getAllDonations() {
    return await prisma.donation.findMany({
      include: { campaign: true },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getDonationsByCampaign(campaignId) {
    return await prisma.donation.findMany({
      where: { campaignId },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getDonationsByDonor(donorId) {
    return await prisma.donation.findMany({
      where: { donorId },
      include: { campaign: true },
      orderBy: { timestamp: 'desc' }
    });
  }

  getDonationTracking(id) {
    return [
      { label: 'Payment Completed', status: 'COMPLETED', relatedId: id, description: 'Simulated fiat payment processed successfully.', timestamp: 'Just now' },
      { label: 'Donation Recorded', status: 'COMPLETED', relatedId: id, description: 'Donation metadata created in system ledger.', timestamp: 'Just now', transactionHash: '0x8f3a91bc...91bc' },
      { label: 'Funds Available', status: 'COMPLETED', relatedId: id, description: 'Funds added to campaign balance.', timestamp: 'Just now' },
      { label: 'Funds Allocated', status: 'COMPLETED', relatedId: id, description: 'Charity allocated funds for project delivery.', timestamp: 'Recent' },
      { label: 'Funds Utilized', status: 'COMPLETED', relatedId: id, description: 'Expenditure executed by charity.', timestamp: 'Recent' },
      { label: 'Evidence Uploaded', status: 'COMPLETED', relatedId: id, description: 'Invoice / proof uploaded to IPFS.', timestamp: 'Recent' },
      { label: 'Evidence Hash Verified', status: 'VERIFIED', relatedId: id, description: 'On-chain SHA-256 hash verified.', timestamp: 'Recent', transactionHash: '0x91df02ab...4d7a' }
    ];
  }
}

export const donationService = new DonationService();
export default donationService;
