import express from 'express';
import { registerCharity, verifyCharity, getCharities, getCharityById } from '../controllers/charityController.js';
import { optionalAuthenticateToken, authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', optionalAuthenticateToken, registerCharity);
router.get('/', getCharities);
router.get('/:id', getCharityById);
router.post('/:id/verify', verifyCharity);

export default router;
