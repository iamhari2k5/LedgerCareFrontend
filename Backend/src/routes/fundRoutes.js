import express from 'express';
import { allocateFund, getFunds, getFundById, getFundsByCampaign } from '../controllers/fundController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuthenticateToken, allocateFund);
router.get('/', getFunds);
router.get('/:id', getFundById);
router.get('/campaign/:campaignId', getFundsByCampaign);

export default router;
