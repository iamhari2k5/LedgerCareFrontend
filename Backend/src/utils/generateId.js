export const generateCharityId = (count) => `CH${String(count).padStart(3, '0')}`;
export const generateCampaignId = (count) => `CMP${String(count).padStart(3, '0')}`;
export const generateDonationId = (count) => `DON${String(count).padStart(3, '0')}`;
export const generateAllocationId = (count) => `ALLOC${String(count).padStart(3, '0')}`;
export const generateEvidenceId = (count) => `EVD${String(count).padStart(3, '0')}`;
export const generatePaymentId = (count) => `PAY${String(count).padStart(3, '0')}`;
export const generatePaymentRef = () => `PAY${Math.floor(10000 + Math.random() * 89999)}`;
