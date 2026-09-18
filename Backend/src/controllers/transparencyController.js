import fundService from '../services/fundService.js';
import campaignService from '../services/campaignService.js';
import donationService from '../services/donationService.js';
import evidenceService from '../services/evidenceService.js';
import eventIndexerService from '../services/eventIndexerService.js';
import blockchainService from '../services/blockchainService.js';
import config from '../config/env.js';

export const getTransparencyOverview = async (req, res, next) => {
  try {
    const financials = await fundService.calculateFinancials();
    const campaigns = await campaignService.getAllCampaigns();
    const donations = await donationService.getAllDonations();
    const allocations = await fundService.getAllAllocations();
    const evidence = await evidenceService.getAllEvidence();
    const events = await eventIndexerService.getEvents();
    const networkStatus = await blockchainService.getNetworkStatus();

    res.status(200).json({
      success: true,
      data: {
        financials,
        totals: {
          charitiesCount: 5,
          campaignsCount: campaigns.length,
          donationsCount: donations.length,
          allocationsCount: allocations.length,
          evidenceCount: evidence.length,
          eventsCount: events.length
        },
        networkStatus,
        contracts: [
          { name: 'CharityRegistry', address: config.blockchain.charityRegistryAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '1 min ago' },
          { name: 'CampaignManager', address: config.blockchain.campaignManagerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '2 min ago' },
          { name: 'DonationLedger', address: config.blockchain.donationLedgerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '3 min ago' },
          { name: 'FundTracker', address: config.blockchain.fundTrackerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '4 min ago' },
          { name: 'EvidenceRegistry', address: config.blockchain.evidenceRegistryAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '5 min ago' }
        ],
        campaigns,
        recentDonations: donations.slice(0, 8),
        allocations,
        evidence,
        events
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaignTransparency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);
    const financials = await fundService.calculateFinancials(id);
    const donations = await donationService.getDonationsByCampaign(id);
    const allocations = await fundService.getAllAllocations(id);
    const evidence = await evidenceService.getAllEvidence(id);

    res.status(200).json({
      success: true,
      data: {
        campaign,
        financials,
        donations,
        allocations,
        evidence
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAuditTrail = async (req, res, next) => {
  try {
    const events = await eventIndexerService.getEvents();
    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
};
