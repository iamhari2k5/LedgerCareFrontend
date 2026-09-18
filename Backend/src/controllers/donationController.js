import donationService from '../services/donationService.js';
import paymentService from '../services/paymentService.js';

export const createPaymentAttempt = async (req, res, next) => {
  try {
    const { campaignId, amount } = req.body;
    const payment = await paymentService.createPaymentAttempt(campaignId, amount);
    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatus = async (req, res, next) => {
  try {
    const payment = await paymentService.getPayment(req.params.id);
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

export const createDonation = async (req, res, next) => {
  try {
    const donation = await donationService.createDonation(req.body, req.user ? req.user.userId : null);
    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

export const getDonations = async (req, res, next) => {
  try {
    const donations = await donationService.getAllDonations();
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

export const getDonationById = async (req, res, next) => {
  try {
    const donation = await donationService.getDonationById(req.params.id);
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

export const getDonationsByDonor = async (req, res, next) => {
  try {
    const donations = await donationService.getDonationsByDonor(req.params.donorId);
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

export const getDonationsByCampaign = async (req, res, next) => {
  try {
    const donations = await donationService.getDonationsByCampaign(req.params.campaignId);
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

export const getDonationTracking = async (req, res, next) => {
  try {
    const tracking = donationService.getDonationTracking(req.params.id);
    res.status(200).json({
      success: true,
      data: tracking
    });
  } catch (error) {
    next(error);
  }
};
