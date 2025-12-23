import React from 'react';
import Link from 'next/link';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
  className?: string;
};

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ currentPage, totalPages, makeHref, className }: PaginationProps): React.ReactElement {
  // Determine which page numbers to show with ellipsis
  const pages: (number | '…')[] = [];
  const siblings = 1;
  const first = 1;
  const last = totalPages;
  const start = Math.max(first, currentPage - siblings);
  const end = Math.min(last, currentPage + siblings);

  if (start > first) {
    pages.push(first);
    if (start > first + 1) pages.push('…');
  }
  for (const p of range(start, end)) pages.push(p);
  if (end < last) {
    if (end < last - 1) pages.push('…');
    pages.push(last);
  }

  return (
    <nav className={`flex items-center justify-center gap-2 ${className ?? ''}`} aria-label="Pagination">
      <Link
        aria-disabled={currentPage <= 1}
        className={`px-3 py-1.5 rounded-full border bg-white hover:bg-gray-50 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        href={makeHref(Math.max(1, currentPage - 1)) as any}
      >
        পূর্ববর্তী
      </Link>

      {pages.map((p, idx) => (
        typeof p === 'number' ? (
          <Link
            key={idx}
            href={makeHref(p) as any}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`px-3 py-1.5 rounded-full border ${p === currentPage ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:bg-gray-50'}`}
          >
            {p}
          </Link>
        ) : (
          <span key={idx} className="px-2">{p}</span>
        )
      ))}

      <Link
        aria-disabled={currentPage >= totalPages}
        className={`px-3 py-1.5 rounded-full border bg-white hover:bg-gray-50 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        href={makeHref(Math.min(totalPages, currentPage + 1)) as any}
      >
        পরবর্তী
      </Link>
    </nav>
  );
}


