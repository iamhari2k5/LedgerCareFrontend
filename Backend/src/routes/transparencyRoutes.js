import express from 'express';
import { getTransparencyOverview, getCampaignTransparency, getAuditTrail } from '../controllers/transparencyController.js';

const router = express.Router();

router.get('/', getTransparencyOverview);
router.get('/campaign/:id', getCampaignTransparency);
router.get('/audit', getAuditTrail);

export default router;
