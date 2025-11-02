'use client';

import * as React from 'react';

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: ReadonlyArray<TabItem>;
  initialId?: string;
  className?: string;
};

export default function Tabs({ items, initialId, className }: TabsProps): JSX.Element {
  const [active, setActive] = React.useState<string>(initialId || items[0]?.id);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = items.findIndex(i => i.id === active);
    if (idx < 0) return;
    if (e.key === 'ArrowRight') {
      setActive(items[(idx + 1) % items.length].id);
    } else if (e.key === 'ArrowLeft') {
      setActive(items[(idx - 1 + items.length) % items.length].id);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 justify-center" role="tablist" onKeyDown={onKeyDown}>
        {items.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            className={`px-4 py-2 rounded-full border transition ${active === t.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
        {items.find(i => i.id === active)?.content}
      </div>
    </div>
  );
}


