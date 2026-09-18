import blockchainService from '../services/blockchainService.js';
import eventIndexerService from '../services/eventIndexerService.js';
import charityService from '../services/charityService.js';
import campaignService from '../services/campaignService.js';
import donationService from '../services/donationService.js';
import fundService from '../services/fundService.js';
import evidenceService from '../services/evidenceService.js';
import config from '../config/env.js';

export const getBlockchainInfo = async (req, res, next) => {
  try {
    const network = await blockchainService.getNetworkStatus();
    const events = await eventIndexerService.getEvents();
    const charities = await charityService.getAllCharities();
    const campaigns = await campaignService.getAllCampaigns();
    const donations = await donationService.getAllDonations();
    const allocations = await fundService.getAllAllocations();
    const evidence = await evidenceService.getAllEvidence();

    res.status(200).json({
      success: true,
      data: {
        network: network.network,
        chainId: network.chainId,
        latestBlock: network.latestBlock,
        status: network.status,
        contracts: [
          { name: 'CharityRegistry', address: config.blockchain.charityRegistryAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '1 min ago' },
          { name: 'CampaignManager', address: config.blockchain.campaignManagerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '2 min ago' },
          { name: 'DonationLedger', address: config.blockchain.donationLedgerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '3 min ago' },
          { name: 'FundTracker', address: config.blockchain.fundTrackerAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '4 min ago' },
          { name: 'EvidenceRegistry', address: config.blockchain.evidenceRegistryAddress, network: 'Hardhat Localhost', status: 'CONNECTED', lastInteraction: '5 min ago' }
        ],
        counts: {
          charities: charities.length,
          campaigns: campaigns.length,
          donations: donations.length,
          funds: allocations.length,
          evidence: evidence.length,
          events: events.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
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
