import express from 'express';
import { createCampaign, getCampaigns, getCampaignById } from '../controllers/campaignController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuthenticateToken, createCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

export default router;
