import charityService from '../services/charityService.js';

export const registerCharity = async (req, res, next) => {
  try {
    const charity = await charityService.registerCharity(req.body, req.user ? req.user.userId : null);
    res.status(201).json({
      success: true,
      data: charity
    });
  } catch (error) {
    next(error);
  }
};

export const verifyCharity = async (req, res, next) => {
  try {
    const charity = await charityService.verifyCharity(req.params.id);
    res.status(200).json({
      success: true,
      data: charity
    });
  } catch (error) {
    next(error);
  }
};

export const getCharities = async (req, res, next) => {
  try {
    const charities = await charityService.getAllCharities();
    res.status(200).json({
      success: true,
      data: charities
    });
  } catch (error) {
    next(error);
  }
};

export const getCharityById = async (req, res, next) => {
  try {
    const charity = await charityService.getCharityById(req.params.id);
    res.status(200).json({
      success: true,
      data: charity
    });
  } catch (error) {
    next(error);
  }
};
