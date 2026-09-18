'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchAllocations, fetchCampaigns, recordFundAllocation, money, Allocation, Campaign } from '@/lib/api';

export default function CharityFundsPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [campaignId, setCampaignId] = useState('CMP001');
  const [amount, setAmount] = useState('25000');
  const [purpose, setPurpose] = useState('');
  const [recipient, setRecipient] = useState('0x5FbDB2315678afecb367f032d93F642f64180aa3');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAllocations().then(setAllocations);
    fetchCampaigns().then(setCampaigns);
  }, []);

  const totalReceived = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalAllocated = allocations.reduce((sum, a) => sum + a.amount, 0);
  const totalUtilized = campaigns.reduce((sum, c) => sum + c.utilized, 0);

  const unallocated = Math.max(0, totalReceived - totalAllocated);
  const allocatedUnused = Math.max(0, totalAllocated - totalUtilized);

  const handleAllocate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !purpose) return;
    setIsSubmitting(true);
    try {
      await recordFundAllocation({
        campaignId,
        amount: Number(amount),
        purpose,
        recipient
      });
      const updated = await fetchAllocations();
      setAllocations(updated);
      setPurpose('');
    } catch {
      // fallback handled in api.ts
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY WORKSPACE</div>
          <h2>Fund Allocation & Financial Math</h2>
        </div>
      </div>

      <div className="fund-flow">
        {[
          ['Total Received', money(totalReceived)],
          ['Allocated', money(totalAllocated)],
          ['Utilized', money(totalUtilized)],
          ['Unallocated', money(unallocated)],
          ['Allocated Unused', money(allocatedUnused)]
        ].map(([l, v], i) => (
          <div key={l} className="flow-step">
            <span>{l}</span>
            <strong>{v}</strong>
            {i < 4 && <ArrowRight size={16} />}
          </div>
        ))}
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">RECORD ALLOCATION</div>
          <h2>Allocate Campaign Funds</h2>
        </div>
      </div>

      <div className="form-card" style={{ maxWidth: '640px' }}>
        <form onSubmit={handleAllocate} className="form-grid">
          <label>
            <span>Target Campaign</span>
            <select className="filter-button" value={campaignId} onChange={e => setCampaignId(e.target.value)}>
              {campaigns.map(c => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
            </select>
          </label>

          <label>
            <span>Allocation Amount (₹)</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
          </label>

          <label className="wide">
            <span>Allocation Purpose</span>
            <input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="e.g. Purchase of 500 mobile clinic diagnostic kits" required />
          </label>

          <label className="wide">
            <span>Vendor / Recipient Wallet Address</span>
            <input value={recipient} onChange={e => setRecipient(e.target.value)} required />
          </label>

          <button type="submit" className="button primary wide" disabled={isSubmitting}>
            {isSubmitting ? 'Recording on FundTracker.sol...' : 'Record Allocation Metadata'} <ArrowRight size={15} />
          </button>
        </form>
        <p className="disclaimer" style={{ marginTop: '12px', fontSize: '11px' }}>
          This records fund allocation metadata on FundTracker.sol contract. It does not represent an on-chain transfer of INR.
        </p>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">ALLOCATION LOG</div>
          <h2>Recorded Allocations</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Allocation ID</th>
              <th>Campaign ID</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Transaction Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong><small>{a.timestamp}</small></td>
                <td>{a.campaignId}</td>
                <td>{a.purpose}</td>
                <td>{money(a.amount)}</td>
                <td className="mono">{a.transactionHash}</td>
                <td><span className="status active"><span />RECORDED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
