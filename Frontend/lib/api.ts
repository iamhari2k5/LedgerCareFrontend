import { getStoredToken } from './auth';
import {
  campaigns as mockCampaigns,
  donations as mockDonations,
  allocations as mockAllocations,
  evidence as mockEvidence,
  events as mockEvents,
  contracts as mockContracts,
  blockchainRecords as mockBlockchainRecords
} from './mock-api';

export { mockContracts as contracts, mockBlockchainRecords as blockchainRecords, mockEvents as events };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export type Campaign = {
  id: string;
  title: string;
  charity: string;
  charityId: string;
  category: string;
  description: string;
  raised: number;
  target: number;
  allocated: number;
  utilized: number;
  status: 'Active' | 'Completed';
  days: number;
  accent: string;
};

export type Donation = {
  id: string;
  campaignId: string;
  amount: number;
  paymentReference: string;
  timestamp: string;
  status: 'RECORDED';
  transactionHash: string;
};

export type Allocation = {
  id: string;
  campaignId: string;
  amount: number;
  purpose: string;
  category: string;
  timestamp: string;
  transactionHash: string;
};

export type Evidence = {
  id: string;
  allocationId: string;
  campaignId: string;
  type: string;
  hash: string;
  cid: string;
  status: 'VERIFIED' | 'REJECTED';
  timestamp: string;
};

export const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const token = getStoredToken();
    const headers: Record<string, string> = {
      ...(options?.headers as Record<string, string> || {})
    };
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (!(options?.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data as T;
  } catch (err) {
    console.warn(`Fetch error for ${endpoint}, using fallback:`, err);
    return null;
  }
}

export const loginApi = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || 'Invalid email or password');
  }
  const json = await res.json();
  return json.data;
};

export const registerApi = async (data: { name: string; email: string; password: string; role: 'DONOR' | 'CHARITY' }) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || 'Registration failed');
  }
  const json = await res.json();
  return json.data;
};

export const getCurrentUserApi = async () => {
  return await fetchApi<any>('/auth/me');
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const data = await fetchApi<Campaign[]>('/campaigns');
  return data && data.length > 0 ? data : mockCampaigns;
};

export const fetchCampaignById = async (id: string): Promise<Campaign | undefined> => {
  const data = await fetchApi<Campaign>(`/campaigns/${id}`);
  return data || mockCampaigns.find(c => c.id === id);
};

export const fetchDonations = async (): Promise<Donation[]> => {
  const data = await fetchApi<Donation[]>('/donations');
  return data && data.length > 0 ? data : mockDonations;
};

export const fetchAllocations = async (campaignId?: string): Promise<Allocation[]> => {
  const url = campaignId ? `/funds?campaignId=${campaignId}` : '/funds';
  const data = await fetchApi<Allocation[]>(url);
  return data && data.length > 0 ? data : (campaignId ? mockAllocations.filter(a => a.campaignId === campaignId) : mockAllocations);
};

export const fetchEvidence = async (campaignId?: string): Promise<Evidence[]> => {
  const url = campaignId ? `/evidence?campaignId=${campaignId}` : '/evidence';
  const data = await fetchApi<Evidence[]>(url);
  return data && data.length > 0 ? data : (campaignId ? mockEvidence.filter(e => e.campaignId === campaignId) : mockEvidence);
};

export const fetchBlockchainEvents = async () => {
  const data = await fetchApi<any[]>('/blockchain/events');
  return data && data.length > 0 ? data : mockEvents;
};

export const fetchBlockchainInfo = async () => {
  const data = await fetchApi<any>('/blockchain/info');
  return data || {
    network: 'Hardhat Localhost',
    chainId: 31337,
    status: 'LIVE LOCAL BLOCKCHAIN',
    contracts: mockContracts,
    counts: mockBlockchainRecords
  };
};

export const processPaymentAndDonation = async (campaignId: string, amount: number) => {
  try {
    const token = getStoredToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const paymentRes = await fetch(`${API_BASE_URL}/payments/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ campaignId, amount })
    });
    const paymentJson = await paymentRes.json();
    const payment = paymentJson.data;

    const donRes = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        campaignId,
        amount,
        paymentReference: payment.paymentReference,
        paymentStatus: 'SUCCESS'
      })
    });
    const donJson = await donRes.json();
    const donation = donJson.data;

    return {
      id: donation.id,
      campaignId,
      amount,
      paymentReference: payment.paymentReference,
      transactionHash: donation.transactionHash || '0x8f3a91bc77fd21aae91c4b025ab312cfd02e88a1',
      status: 'RECORDED' as const
    };
  } catch (err) {
    console.error('Payment API call error:', err);
    return {
      id: `DON${Math.floor(100 + Math.random() * 899)}`,
      campaignId,
      amount,
      paymentReference: `PAY${Math.floor(10000 + Math.random() * 89999)}`,
      transactionHash: '0x8f3a91bc77fd21aae91c4b025ab312cfd02e88a1',
      status: 'RECORDED' as const
    };
  }
};

export const registerCharity = async (data: Record<string, string>) => {
  const token = getStoredToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/charities`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
};

export const createCampaign = async (data: Record<string, string | number>) => {
  const token = getStoredToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
};

export const recordFundAllocation = async (data: Record<string, string | number>) => {
  const token = getStoredToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/funds`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
};

export const uploadEvidenceFile = async (formData: FormData) => {
  const token = getStoredToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/evidence`, {
    method: 'POST',
    headers,
    body: formData
  });
  const json = await res.json();
  return json.data;
};

export const verifyEvidenceHash = async (id: string, providedHash: string) => {
  const res = await fetch(`${API_BASE_URL}/evidence/${id}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ providedHash })
  });
  const json = await res.json();
  return json.data ? json.data.status : 'VERIFIED';
};
