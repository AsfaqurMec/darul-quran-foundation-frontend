'use client';

import * as React from 'react';

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

export default function Accordion({ items }: { items: ReadonlyArray<AccordionItem> }): JSX.Element {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.id} className="rounded-2xl border border-emerald-200 bg-white">
          <button type="button" className="w-full text-left px-4 py-3 font-semibold flex items-center justify-between" onClick={() => setOpenId(openId === it.id ? null : it.id)}>
            {it.question}
            <span>{openId === it.id ? '−' : '+'}</span>
          </button>
          {openId === it.id ? (
            <div className="px-4 pb-4 text-gray-700 leading-7">
              {it.answer}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}


