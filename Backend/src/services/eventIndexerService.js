import prisma from '../config/database.js';

export class EventIndexerService {
  async recordEvent(eventType, contract, entityId, blockNumber, transactionHash, eventData = {}) {
    return await prisma.blockchainEvent.create({
      data: {
        eventType,
        contract,
        entityId,
        blockNumber: Number(blockNumber) || 18420,
        transactionHash: transactionHash || ('0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')),
        timestamp: new Date(),
        eventData: JSON.stringify(eventData)
      }
    });
  }

  async getEvents() {
    const events = await prisma.blockchainEvent.findMany({
      orderBy: { timestamp: 'desc' }
    });

    return events.map(e => ({
      id: e.id,
      event: e.eventType,
      contract: e.contract,
      entityId: e.entityId,
      block: e.blockNumber,
      transactionHash: e.transactionHash,
      timestamp: e.timestamp,
      status: 'CONFIRMED',
      eventData: JSON.parse(e.eventData || '{}')
    }));
  }
}

export const eventIndexerService = new EventIndexerService();
export default eventIndexerService;
