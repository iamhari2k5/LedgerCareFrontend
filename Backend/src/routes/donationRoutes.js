import express from 'express';
import {
  createPaymentAttempt,
  getPaymentStatus,
  createDonation,
  getDonations,
  getDonationById,
  getDonationsByDonor,
  getDonationsByCampaign,
  getDonationTracking
} from '../controllers/donationController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/payments/create', createPaymentAttempt);
router.get('/payments/:id', getPaymentStatus);

router.post('/donations', optionalAuthenticateToken, createDonation);
router.get('/donations', getDonations);
router.get('/donations/:id', getDonationById);
router.get('/donations/donor/:donorId', getDonationsByDonor);
router.get('/donations/campaign/:campaignId', getDonationsByCampaign);
router.get('/donations/:id/tracking', getDonationTracking);

export default router;
