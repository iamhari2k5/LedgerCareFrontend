'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { fetchBlockchainInfo, fetchBlockchainEvents, contracts, blockchainRecords, events as fallbackEvents } from '@/lib/api';

export default function BlockchainExplorerPage() {
  const [info, setInfo] = useState<any>(null);
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    fetchBlockchainInfo().then(setInfo);
    fetchBlockchainEvents().then(setEventsList);
  }, []);

  const displayEvents = eventsList.length > 0 ? eventsList : fallbackEvents;

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">BLOCKCHAIN & SMART CONTRACT</div>
          <h2>Live Local Network Records</h2>
        </div>
        <span className="status active"><span />{info?.status || 'LIVE LOCAL BLOCKCHAIN'}</span>
      </div>

      <div className="network-banner">
        <div><span>Network</span><strong>{info?.network || 'Hardhat Localhost'}</strong></div>
        <div><span>Chain ID</span><strong>{info?.chainId || 31337}</strong></div>
        <div><span>Latest block</span><strong>18,512</strong></div>
        <div><span>Connection</span><strong className="verified">LIVE HARDHAT LOCALNET</strong></div>
      </div>

      <section className="stats-grid compact-stats" style={{ marginTop: '24px' }}>
        {[
          ['Charity records', info?.counts?.charities || blockchainRecords.charities],
          ['Campaign records', info?.counts?.campaigns || blockchainRecords.campaigns],
          ['Donation records', info?.counts?.donations || blockchainRecords.donations],
          ['Fund records', info?.counts?.funds || blockchainRecords.funds],
          ['Evidence records', info?.counts?.evidence || blockchainRecords.evidence]
        ].map(([l, v]) => (
          <div className="stat-card" key={String(l)}>
            <div className="stat-icon purple"><Zap size={18} /></div>
            <div>
              <div className="stat-label">{String(l)}</div>
              <div className="stat-value">{String(v)}</div>
              <div className="stat-note">Public metadata</div>
            </div>
          </div>
        ))}
      </section>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">SMART CONTRACTS</div>
          <h2>Deployed Contract Addresses</h2>
        </div>
        <Link href="/blockchain/contracts" className="text-button">View detail</Link>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Address</th>
              <th>Network</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(info?.contracts || contracts).map((c: any) => (
              <tr key={c.name}>
                <td><strong>{c.name}</strong></td>
                <td className="mono">{c.address}</td>
                <td>{c.network}</td>
                <td><span className="status active"><span />{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-heading" style={{ marginTop: '32px' }}>
        <div>
          <div className="section-kicker">EVENT HISTORY</div>
          <h2>Indexed On-Chain Events</h2>
        </div>
        <Link href="/blockchain/events" className="text-button">View all events</Link>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Entity ID</th>
              <th>Block</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {displayEvents.slice(0, 8).map((e, idx) => (
              <tr key={idx}>
                <td><strong>{e.event || e.eventType}</strong></td>
                <td>{e.entityId}</td>
                <td>{e.block || e.blockNumber}</td>
                <td className="mono">{e.transactionHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
