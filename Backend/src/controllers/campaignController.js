import campaignService from '../services/campaignService.js';

export const createCampaign = async (req, res, next) => {
  try {
    const campaign = await campaignService.createCampaign(req.body, req.user ? req.user.userId : null);
    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const { category, query } = req.query;
    const campaigns = await campaignService.getAllCampaigns(category, query);
    res.status(200).json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};
