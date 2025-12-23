'use client';

import * as React from 'react';

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

type TabsProps = {
  items: ReadonlyArray<TabItem>;
  initialId?: string;
  className?: string;
};

export default function Tabs({ items, initialId, className }: TabsProps): React.ReactElement {
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
      {/* Tabs header with soft container */}
      <div
        className="rounded-[20px] border border-emerald-100 bg-white p-2 flex flex-wrap gap-2 justify-center"
        role="tablist"
        onKeyDown={onKeyDown}
      >
        {items.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              className={`flex items-center gap-3 px-6 py-4 rounded-[16px] transition border ${
                isActive
                  ? 'bg-emerald-100 border-emerald-100 text-emerald-900'
                  : 'bg-white border-transparent text-emerald-800 hover:bg-emerald-50'
              }`}
              onClick={() => setActive(t.id)}
            >
              {t.icon ? <span className={`text-emerald-600 ${isActive ? '' : ''}`}>{t.icon}</span> : null}
              <span className="text-lg font-semibold">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active content */}
      <div className="mt-6">
        {items.find(i => i.id === active)?.content}
      </div>
    </div>
  );
}


