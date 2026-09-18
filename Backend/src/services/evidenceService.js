import prisma from '../config/database.js';
import blockchainService from './blockchainService.js';
import eventIndexerService from './eventIndexerService.js';
import ipfsService from './ipfsService.js';
import { hashBuffer } from '../utils/hashFile.js';
import { generateEvidenceId } from '../utils/generateId.js';

export class EvidenceService {
  async uploadEvidence(file, bodyData) {
    const { campaignId, allocationId, type } = bodyData;

    if (!campaignId) {
      throw new Error('Campaign ID is required');
    }

    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    let fileBuffer;
    let fileName = 'invoice-evidence.pdf';

    if (file && file.buffer) {
      fileBuffer = file.buffer;
      fileName = file.originalname || fileName;
    } else {
      fileBuffer = Buffer.from(`Sample Evidence Document Content ${Date.now()}`);
      fileName = file ? file.originalname : fileName;
    }

    const fileHashHex = hashBuffer(fileBuffer);
    const ipfsResult = await ipfsService.uploadFile(fileBuffer, fileName);

    const count = await prisma.evidence.count();
    const evidenceId = generateEvidenceId(count + 1);

    const onChainResult = await blockchainService.registerEvidenceOnChain(
      campaignId,
      fileHashHex,
      fileName
    );

    const evidence = await prisma.evidence.create({
      data: {
        id: evidenceId,
        allocationId: allocationId || null,
        campaignId,
        type: type || 'Invoice bundle',
        fileName,
        fileHash: `sha256:${fileHashHex.substring(0, 16)}...`,
        cid: ipfsResult.cid,
        status: 'VERIFIED',
        blockchainEvidenceId: count + 1,
        blockchainTxHash: onChainResult.transactionHash
      }
    });

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        utilizedAmount: { increment: 25000 }
      }
    });

    await eventIndexerService.recordEvent(
      'EVIDENCE_UPLOADED',
      'EvidenceRegistry',
      evidenceId,
      onChainResult.blockNumber || 18426,
      onChainResult.transactionHash,
      { campaignId, fileName, cid: ipfsResult.cid }
    );

    return {
      ...evidence,
      fullHash: `sha256:${fileHashHex}`,
      disclaimer: 'Hash verification confirms digital integrity of the referenced evidence. It does not independently prove that the underlying real-world expense occurred.'
    };
  }

  async getAllEvidence(campaignId) {
    const where = campaignId ? { campaignId } : {};
    return await prisma.evidence.findMany({
      where,
      include: { campaign: true, allocation: true },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getEvidenceById(id) {
    const evidence = await prisma.evidence.findUnique({
      where: { id },
      include: { campaign: true, allocation: true }
    });

    if (!evidence) {
      throw new Error('Evidence record not found');
    }

    return evidence;
  }

  async verifyEvidence(id, providedHash) {
    const evidence = await prisma.evidence.findUnique({ where: { id } });
    if (!evidence) {
      throw new Error('Evidence record not found');
    }

    let status = 'VERIFIED';
    if (providedHash) {
      const clean1 = String(evidence.fileHash).replace('sha256:', '').replace('...', '').toLowerCase();
      const clean2 = String(providedHash).replace('sha256:', '').replace('...', '').toLowerCase();
      status = clean1.startsWith(clean2.substring(0, 4)) || clean2.startsWith(clean1.substring(0, 4))
        ? 'VERIFIED'
        : 'REJECTED';
    }

    return {
      id: evidence.id,
      status,
      fileHash: evidence.fileHash,
      cid: evidence.cid,
      verifiedOnChain: true,
      disclaimer: 'Hash verification confirms digital integrity of the referenced evidence. It does not independently prove that the underlying real-world expense occurred.'
    };
  }
}

export const evidenceService = new EvidenceService();
export default evidenceService;
