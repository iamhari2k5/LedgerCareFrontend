import fundService from '../services/fundService.js';

export const allocateFund = async (req, res, next) => {
  try {
    const allocation = await fundService.allocateFund(req.body);
    res.status(201).json({
      success: true,
      data: allocation
    });
  } catch (error) {
    next(error);
  }
};

export const getFunds = async (req, res, next) => {
  try {
    const { campaignId } = req.query;
    const allocations = await fundService.getAllAllocations(campaignId);
    res.status(200).json({
      success: true,
      data: allocations
    });
  } catch (error) {
    next(error);
  }
};

export const getFundById = async (req, res, next) => {
  try {
    const allocation = await fundService.getAllocationById(req.params.id);
    res.status(200).json({
      success: true,
      data: allocation
    });
  } catch (error) {
    next(error);
  }
};

export const getFundsByCampaign = async (req, res, next) => {
  try {
    const allocations = await fundService.getAllAllocations(req.params.campaignId);
    res.status(200).json({
      success: true,
      data: allocations
    });
  } catch (error) {
    next(error);
  }
};
