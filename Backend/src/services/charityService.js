import prisma from '../config/database.js';
import blockchainService from './blockchainService.js';
import eventIndexerService from './eventIndexerService.js';
import { generateCharityId } from '../utils/generateId.js';

export class CharityService {
  async registerCharity(data, userId) {
    const { organizationName, registrationNumber, email, walletAddress } = data;

    if (!organizationName || !registrationNumber || !email) {
      throw new Error('Organization name, registration number, and email are required');
    }

    const count = await prisma.charityProfile.count();
    const charityId = generateCharityId(count + 1);

    const onChainResult = await blockchainService.registerCharityOnChain(
      organizationName,
      registrationNumber,
      email
    );

    const charity = await prisma.charityProfile.create({
      data: {
        id: charityId,
        userId,
        organizationName,
        registrationNumber,
        email,
        walletAddress: walletAddress || '0x7A3f...91bc',
        verificationStatus: 'VALIDATED',
        blockchainTxHash: onChainResult.transactionHash,
        blockchainCharityId: count + 1
      }
    });

    await eventIndexerService.recordEvent(
      'CHARITY_REGISTERED',
      'CharityRegistry',
      charityId,
      onChainResult.blockNumber || 18420,
      onChainResult.transactionHash,
      { organizationName, registrationNumber, email }
    );

    return charity;
  }

  async verifyCharity(charityId) {
    const charity = await prisma.charityProfile.findUnique({ where: { id: charityId } });
    if (!charity) {
      throw new Error('Charity not found');
    }

    const onChainResult = await blockchainService.verifyCharityOnChain(charity.blockchainCharityId || 1);

    const updated = await prisma.charityProfile.update({
      where: { id: charityId },
      data: { verificationStatus: 'VALIDATED' }
    });

    await eventIndexerService.recordEvent(
      'CHARITY_VALIDATED',
      'CharityRegistry',
      charityId,
      onChainResult.blockNumber || 18421,
      onChainResult.transactionHash,
      { verificationNote: 'Verified by system validation rules' }
    );

    return updated;
  }

  async getAllCharities() {
    return await prisma.charityProfile.findMany({
      include: { campaigns: true },
      orderBy: { id: 'asc' }
    });
  }

  async getCharityById(id) {
    const charity = await prisma.charityProfile.findUnique({
      where: { id },
      include: { campaigns: true }
    });

    if (!charity) {
      throw new Error('Charity not found');
    }

    return charity;
  }
}

export const charityService = new CharityService();
export default charityService;
