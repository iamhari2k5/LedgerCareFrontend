import express from 'express';
import { uploadEvidence, getEvidenceList, getEvidenceById, verifyEvidence } from '../controllers/evidenceController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('file'), uploadEvidence);
router.get('/', getEvidenceList);
router.get('/:id', getEvidenceById);
router.post('/:id/verify', verifyEvidence);

export default router;
