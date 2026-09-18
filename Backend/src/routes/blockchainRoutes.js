import express from 'express';
import { getBlockchainInfo, getEvents } from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/info', getBlockchainInfo);
router.get('/events', getEvents);
router.get('/events/:id', getEvents);

export default router;
