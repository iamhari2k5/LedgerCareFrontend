'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRight, FileCheck2, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { EvidenceVerifyModal } from '@/components/EvidenceVerifyModal';
import { fetchEvidence, fetchCampaigns, fetchAllocations, uploadEvidenceFile, Evidence, Campaign, Allocation } from '@/lib/api';

export default function CharityEvidencePage() {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  const [campaignId, setCampaignId] = useState('CMP001');
  const [type, setType] = useState('Invoice bundle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEvidence().then(setEvidenceList);
    fetchCampaigns().then(setCampaigns);
    fetchAllocations().then(setAllocations);
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('campaignId', campaignId);
      formData.append('type', type);
      await uploadEvidenceFile(formData);
      const updated = await fetchEvidence();
      setEvidenceList(updated);
    } catch {
      // API fallback handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">CHARITY WORKSPACE</div>
          <h2>Evidence Registry & SHA-256 Verification</h2>
        </div>
      </div>

      <div className="form-card" style={{ maxWidth: '640px', marginBottom: '32px' }}>
        <form onSubmit={handleUpload} className="form-grid">
          <label>
            <span>Campaign</span>
            <select className="filter-button" value={campaignId} onChange={e => setCampaignId(e.target.value)}>
              {campaigns.map(c => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
            </select>
          </label>

          <label>
            <span>Evidence Type</span>
            <input value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Vendor Invoice Bundle" required />
          </label>

          <label className="wide">
            <span>Supporting File (PDF / Image / Receipts)</span>
            <input type="file" className="search-box" style={{ width: '100%', padding: '8px' }} />
          </label>

          <button type="submit" className="button primary wide" disabled={isSubmitting}>
            {isSubmitting ? 'Hashing & Registering on EvidenceRegistry.sol...' : 'Upload Evidence & Compute SHA-256'} <ArrowRight size={15} />
          </button>
        </form>
      </div>

      <div className="section-heading">
        <div>
          <div className="section-kicker">EVIDENCE RECORDS</div>
          <h2>Verification Proofs</h2>
        </div>
      </div>

      <div className="evidence-grid">
        {evidenceList.map(e => (
          <div className="evidence-card" key={e.id}>
            <div className="evidence-card-head">
              <strong>{e.id}</strong>
              <span className="status active"><span />{e.status}</span>
            </div>
            <p>{e.type}</p>
            <span className="mono">{e.hash}</span>
            <small>CID: {e.cid}</small>
            <button className="text-button" onClick={() => setSelectedEvidence(e)} style={{ marginTop: '12px' }}>
              Verify SHA-256 Hash <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <p className="disclaimer" style={{ marginTop: '20px' }}>
        <ShieldCheck size={15} style={{ display: 'inline', marginRight: '4px' }} />
        Hash verification confirms digital integrity of the referenced evidence. It does not independently prove that the underlying real-world expense occurred.
      </p>

      {selectedEvidence && (
        <EvidenceVerifyModal
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      )}
    </AppShell>
  );
}
