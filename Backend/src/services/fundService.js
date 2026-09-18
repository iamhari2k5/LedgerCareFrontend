import prisma from '../config/database.js';
import blockchainService from './blockchainService.js';
import eventIndexerService from './eventIndexerService.js';
import { generateAllocationId } from '../utils/generateId.js';

export class FundService {
  async allocateFund(data) {
    const { campaignId, recipient, amount, purpose, category } = data;

    if (!campaignId || !amount || !purpose) {
      throw new Error('Campaign ID, amount, and purpose are required');
    }

    if (Number(amount) <= 0) {
      throw new Error('Allocation amount must be greater than zero');
    }

    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const recipientAddress = recipient || '0x7A3f91BcE2d14cA8bF2091bc4e210af28d10cc41';

    const count = await prisma.fundAllocation.count();
    const allocationId = generateAllocationId(count + 1);

    const onChainResult = await blockchainService.recordAllocationOnChain(
      campaignId,
      recipientAddress,
      Number(amount),
      purpose
    );

    const allocation = await prisma.fundAllocation.create({
      data: {
        id: allocationId,
        campaignId,
        recipient: recipientAddress,
        amount: Number(amount),
        purpose,
        category: category || 'General',
        blockchainAllocationId: count + 1,
        blockchainTxHash: onChainResult.transactionHash
      }
    });

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        allocatedAmount: { increment: Number(amount) }
      }
    });

    await eventIndexerService.recordEvent(
      'FUNDS_ALLOCATED',
      'FundTracker',
      allocationId,
      onChainResult.blockNumber || 18424,
      onChainResult.transactionHash,
      { campaignId, recipient: recipientAddress, amount, purpose }
    );

    return allocation;
  }

  async getAllAllocations(campaignId) {
    const where = campaignId ? { campaignId } : {};
    return await prisma.fundAllocation.findMany({
      where,
      include: { campaign: true, evidence: true },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getAllocationById(id) {
    const allocation = await prisma.fundAllocation.findUnique({
      where: { id },
      include: { campaign: true, evidence: true }
    });

    if (!allocation) {
      throw new Error('Allocation not found');
    }

    return allocation;
  }

  async calculateFinancials(campaignId) {
    let donations;
    let allocations;
    let evidenceList;

    if (campaignId) {
      donations = await prisma.donation.findMany({ where: { campaignId } });
      allocations = await prisma.fundAllocation.findMany({ where: { campaignId } });
      evidenceList = await prisma.evidence.findMany({ where: { campaignId, status: 'VERIFIED' } });
    } else {
      donations = await prisma.donation.findMany();
      allocations = await prisma.fundAllocation.findMany();
      evidenceList = await prisma.evidence.findMany({ where: { status: 'VERIFIED' } });
    }

    const totalReceived = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalAllocated = allocations.reduce((sum, a) => sum + a.amount, 0);
    
    const campaigns = campaignId
      ? await prisma.campaign.findMany({ where: { id: campaignId } })
      : await prisma.campaign.findMany();
    
    const totalUtilized = campaigns.reduce((sum, c) => sum + c.utilizedAmount, 0);

    const unallocated = Math.max(0, totalReceived - totalAllocated);
    const allocatedUnused = Math.max(0, totalAllocated - totalUtilized);

    return {
      totalReceived,
      allocated: totalAllocated,
      utilized: totalUtilized,
      unallocated,
      allocatedUnused
    };
  }
}

export const fundService = new FundService();
export default fundService;
