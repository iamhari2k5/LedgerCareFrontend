import prisma from '../config/database.js';
import blockchainService from './blockchainService.js';
import eventIndexerService from './eventIndexerService.js';
import { generateCampaignId } from '../utils/generateId.js';

export class CampaignService {
  async createCampaign(data, charityUserId) {
    const { title, description, category, targetAmount, startDate, endDate, charityId, accent } = data;

    if (!title || !description || !targetAmount || !startDate || !endDate) {
      throw new Error('Title, description, target amount, start date, and end date are required');
    }

    if (Number(targetAmount) <= 0) {
      throw new Error('Target amount must be greater than zero');
    }

    if (new Date(endDate) <= new Date(startDate)) {
      throw new Error('End date must be after start date');
    }

    let charity = null;
    if (charityId) {
      charity = await prisma.charityProfile.findUnique({ where: { id: charityId } });
    } else if (charityUserId) {
      charity = await prisma.charityProfile.findUnique({ where: { userId: charityUserId } });
    }

    if (!charity) {
      const firstCharity = await prisma.charityProfile.findFirst();
      if (firstCharity) {
        charity = firstCharity;
      } else {
        throw new Error('Valid charity profile is required to create a campaign');
      }
    }

    const count = await prisma.campaign.count();
    const campaignId = generateCampaignId(count + 1);

    const onChainResult = await blockchainService.createCampaignOnChain(
      count + 1,
      title,
      description,
      targetAmount,
      startDate,
      endDate
    );

    const campaign = await prisma.campaign.create({
      data: {
        id: campaignId,
        charityId: charity.id,
        title,
        description,
        category: category || 'Community',
        targetAmount: Number(targetAmount),
        raisedAmount: 0,
        allocatedAmount: 0,
        utilizedAmount: 0,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'Active',
        accent: accent || 'violet',
        blockchainCampaignId: count + 1,
        blockchainTxHash: onChainResult.transactionHash
      },
      include: {
        charity: true
      }
    });

    await eventIndexerService.recordEvent(
      'CAMPAIGN_CREATED',
      'CampaignManager',
      campaignId,
      onChainResult.blockNumber || 18422,
      onChainResult.transactionHash,
      { title, targetAmount, charityId: charity.id }
    );

    return this.formatCampaign(campaign);
  }

  async getAllCampaigns(category, query) {
    let whereClause = {};

    if (category && category !== 'All') {
      whereClause.category = category;
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { description: { contains: query } }
      ];
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: { charity: true },
      orderBy: { createdAt: 'desc' }
    });

    return campaigns.map(c => this.formatCampaign(c));
  }

  async getCampaignById(id) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        charity: true,
        donations: true,
        allocations: true,
        evidence: true
      }
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return this.formatCampaign(campaign);
  }

  formatCampaign(c) {
    const now = new Date();
    const end = new Date(c.endDate);
    const diffTime = end.getTime() - now.getTime();
    const daysLeft = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

    return {
      id: c.id,
      title: c.title,
      charity: c.charity ? c.charity.organizationName : 'Charity',
      charityId: c.charityId,
      category: c.category,
      description: c.description,
      raised: c.raisedAmount,
      target: c.targetAmount,
      allocated: c.allocatedAmount,
      utilized: c.utilizedAmount,
      status: c.status,
      days: daysLeft,
      accent: c.accent || 'violet',
      startDate: c.startDate,
      endDate: c.endDate,
      blockchainTxHash: c.blockchainTxHash
    };
  }
}

export const campaignService = new CampaignService();
export default campaignService;
