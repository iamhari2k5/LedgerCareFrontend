import prisma from '../config/database.js';
import { generatePaymentId, generatePaymentRef } from '../utils/generateId.js';

export class PaymentService {
  async createPaymentAttempt(campaignId, amount) {
    if (!amount || amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }

    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const count = await prisma.payment.count();
    const id = generatePaymentId(count + 1);
    const paymentReference = generatePaymentRef();

    const payment = await prisma.payment.create({
      data: {
        id,
        paymentReference,
        amount: Number(amount),
        currency: 'INR',
        paymentMethod: 'SIMULATED_FIAT',
        status: 'SUCCESS'
      }
    });

    return payment;
  }

  async getPayment(paymentId) {
    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { id: paymentId },
          { paymentReference: paymentId }
        ]
      }
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return payment;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
