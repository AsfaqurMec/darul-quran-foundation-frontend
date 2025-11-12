'use client';

import Button from '@/components/ui/button';
import { useState } from 'react';

type Props = {
  onChange?: (val: { preset: 'today' | 'week' | 'month' | 'year' | 'range'; from?: string; to?: string }) => void;
};

export default function FiltersBar({ onChange }: Props): JSX.Element {
  const [preset, setPreset] = useState<'today' | 'week' | 'month' | 'year' | 'range'>('month');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const apply = () => onChange?.({ preset, from, to });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-sm font-medium mb-1">Preset</label>
        <select value={preset} onChange={(e)=>setPreset(e.target.value as any)} className="rounded-lg border px-3 py-2">
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
          <option value="range">Custom range</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="rounded-lg border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="rounded-lg border px-3 py-2" />
      </div>
      <div className="mb-1">
        <Button onClick={apply}>Apply</Button>
      </div>
    </div>
  );
}


