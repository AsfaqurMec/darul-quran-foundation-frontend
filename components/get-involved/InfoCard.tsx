import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function InfoCard({ title, children }: Props): React.ReactElement {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-gray-700 leading-7 text-sm">
        {children}
      </div>
    </div>
  );
}


