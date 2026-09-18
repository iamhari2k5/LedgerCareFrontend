import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config/env.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import charityRoutes from './routes/charityRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import fundRoutes from './routes/fundRoutes.js';
import evidenceRoutes from './routes/evidenceRoutes.js';
import transparencyRoutes from './routes/transparencyRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';

const app = express();

app.use(cors({
  origin: [config.frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Blockchain Charity Backend Service Active',
    timestamp: new Date()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api', donationRoutes);
app.use('/api/funds', fundRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/transparency', transparencyRoutes);
app.use('/api/blockchain', blockchainRoutes);

app.use(errorHandler);

export default app;
