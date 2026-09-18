import request from 'supertest';
import app from '../src/app.js';

describe('Backend API Integration Tests', () => {
  it('GET /api/health should return OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('POST /api/auth/register should register a new donor', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Donor',
        email: `testdonor_${Date.now()}@example.com`,
        password: 'password123',
        role: 'DONOR'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('GET /api/campaigns should return seeded campaigns list', async () => {
    const res = await request(app).get('/api/campaigns');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('POST /api/payments/create & POST /api/donations should create fiat payment & donation record', async () => {
    const payRes = await request(app)
      .post('/api/payments/create')
      .send({
        campaignId: 'CMP001',
        amount: 5000
      });
    expect(payRes.status).toBe(201);
    expect(payRes.body.data.paymentReference).toBeDefined();

    const donRes = await request(app)
      .post('/api/donations')
      .send({
        campaignId: 'CMP001',
        amount: 5000,
        paymentReference: payRes.body.data.paymentReference,
        paymentStatus: 'SUCCESS'
      });
    expect(donRes.status).toBe(201);
    expect(donRes.body.data.id).toBeDefined();
    expect(donRes.body.data.transactionHash).toBeDefined();
  });

  it('POST /api/funds should record a fund allocation', async () => {
    const res = await request(app)
      .post('/api/funds')
      .send({
        campaignId: 'CMP001',
        amount: 3000,
        purpose: 'Textbook distribution',
        recipient: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
  });

  it('POST /api/evidence and verification should upload & verify SHA-256 hash', async () => {
    const uploadRes = await request(app)
      .post('/api/evidence')
      .field('campaignId', 'CMP001')
      .field('type', 'Invoice bundle')
      .attach('file', Buffer.from('Invoice content sample test'), 'invoice.pdf');

    expect(uploadRes.status).toBe(201);
    expect(uploadRes.body.data.id).toBeDefined();
    expect(uploadRes.body.data.fileHash).toBeDefined();

    const evId = uploadRes.body.data.id;
    const verifyRes = await request(app)
      .post(`/api/evidence/${evId}/verify`)
      .send({ providedHash: uploadRes.body.data.fileHash });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.data.status).toBe('VERIFIED');
    expect(verifyRes.body.data.disclaimer).toContain('Hash verification confirms digital integrity');
  });

  it('GET /api/transparency should return full public audit report', async () => {
    const res = await request(app).get('/api/transparency');
    expect(res.status).toBe(200);
    expect(res.body.data.financials).toBeDefined();
    expect(res.body.data.contracts).toHaveLength(5);
  });
});
