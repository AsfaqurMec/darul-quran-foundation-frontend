import { PropsWithChildren } from 'react';

type CardBoxProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export default function CardBox({ title, className, children }: CardBoxProps): JSX.Element {
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-base hover:-translate-y-0.5 hover:shadow-md ${className ?? ''}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-brand/10 transition-base" />
      {title ? <div className="text-sm font-medium text-gray-600 mb-2">{title}</div> : null}
      {children}
    </div>
  );
}


