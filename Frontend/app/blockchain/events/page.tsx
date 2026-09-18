'use client'

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { fetchBlockchainEvents, events as fallbackEvents } from '@/lib/api';

export default function BlockchainEventsPage() {
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    fetchBlockchainEvents().then(setEventsList);
  }, []);

  const displayEvents = eventsList.length > 0 ? eventsList : fallbackEvents;

  return (
    <AppShell>
      <div className="section-heading">
        <div>
          <div className="section-kicker">ON-CHAIN EVENT STREAM</div>
          <h2>Indexed Smart Contract Events</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Entity ID</th>
              <th>Block Number</th>
              <th>Timestamp</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {displayEvents.map((e, idx) => (
              <tr key={idx}>
                <td><strong>{e.event || e.eventType}</strong></td>
                <td>{e.entityId}</td>
                <td>{e.block || e.blockNumber}</td>
                <td>{e.timestamp}</td>
                <td className="mono">{e.transactionHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
