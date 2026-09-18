import evidenceService from '../services/evidenceService.js';

export const uploadEvidence = async (req, res, next) => {
  try {
    const evidence = await evidenceService.uploadEvidence(req.file, req.body);
    res.status(201).json({
      success: true,
      data: evidence
    });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceList = async (req, res, next) => {
  try {
    const { campaignId } = req.query;
    const list = await evidenceService.getAllEvidence(campaignId);
    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceById = async (req, res, next) => {
  try {
    const evidence = await evidenceService.getEvidenceById(req.params.id);
    res.status(200).json({
      success: true,
      data: evidence
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEvidence = async (req, res, next) => {
  try {
    const { providedHash } = req.body;
    const result = await evidenceService.verifyEvidence(req.params.id, providedHash);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
