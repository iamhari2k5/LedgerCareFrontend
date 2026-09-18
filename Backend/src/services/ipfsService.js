import crypto from 'crypto';

export class IpfsService {
  async uploadFile(fileBuffer, fileName) {
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const mockCid = `QmMockCharityEvidence${hash.substring(0, 10)}`;

    return {
      cid: mockCid,
      hash: `sha256:${hash.substring(0, 32)}...`,
      fullHash: `sha256:${hash}`,
      fileName,
      size: fileBuffer.length,
      mode: 'mock'
    };
  }
}

export const ipfsService = new IpfsService();
export default ipfsService;
