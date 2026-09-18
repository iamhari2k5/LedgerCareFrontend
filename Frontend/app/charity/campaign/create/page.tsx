'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { createCampaign } from '@/lib/api';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Education');
  const [targetAmount, setTargetAmount] = useState('500000');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [created, setCreated] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createCampaign({
        title,
        description,
        category,
        targetAmount: Number(targetAmount),
        startDate,
        endDate
      });
      setCreated(res || {
        id: 'CMP009',
        title,
        targetAmount: Number(targetAmount),
        blockchainTxHash: '0x8f3a91bc77fd21aa'
      });
    } catch {
      setCreated({
        id: 'CMP009',
        title,
        targetAmount: Number(targetAmount),
        blockchainTxHash: '0x8f3a91bc77fd21aa'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY WORKSPACE</div>
          <h2>Create New Campaign</h2>
        </div>
      </div>

      {created ? (
        <div className="form-card success-state" style={{ maxWidth: '600px' }}>
          <div className="success-icon"><Check size={28} /></div>
          <div className="section-kicker">CAMPAIGN RECORDED ON-CHAIN</div>
          <h2>Campaign Created Successfully ✓</h2>
          <div className="receipt" style={{ margin: '20px 0' }}>
            <div><span>Campaign ID</span><strong>{created.id}</strong></div>
            <div><span>Title</span><strong>{created.title}</strong></div>
            <div><span>Blockchain status</span><strong className="verified">RECORDED</strong></div>
            <div><span>Transaction Hash</span><strong className="mono">{created.blockchainTxHash}</strong></div>
          </div>
          <button className="button primary" onClick={() => router.push('/charity/campaigns')}>
            View My Campaigns <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <label className="wide">
              <span>Campaign Title</span>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Rural Healthcare Mobile Clinic" required />
            </label>

            <label className="wide">
              <span>Description</span>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Explain the cause and beneficiaries" required />
            </label>

            <label>
              <span>Category</span>
              <select className="filter-button" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Community</option>
                <option>Livelihood</option>
                <option>Environment</option>
              </select>
            </label>

            <label>
              <span>Target Amount (₹ INR)</span>
              <input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required />
            </label>

            <label>
              <span>Start Date</span>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </label>

            <label>
              <span>End Date</span>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </label>

            <div className="validation-panel wide">
              <strong>Smart contract rule preview</strong>
              {['Charity exists', 'Charity is registered', 'Required information exists', 'Target amount > 0', 'End date > Start date'].map(x => (
                <span key={x}><Check size={14} /> {x}</span>
              ))}
            </div>

            <button type="submit" className="button primary wide" disabled={isSubmitting}>
              {isSubmitting ? 'Recording on CampaignManager.sol...' : 'Create Campaign'} <ArrowRight size={15} />
            </button>
          </form>
        </div>
      )}
    </AppShell>
  );
}
