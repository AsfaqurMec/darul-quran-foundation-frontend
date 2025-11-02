type Props = { title: string; value: string | number; subtitle?: string };

export default function StatCard({ title, value, subtitle }: Props): JSX.Element {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-extrabold text-emerald-900">{value}</div>
      {subtitle ? <div className="text-xs text-gray-500">{subtitle}</div> : null}
    </div>
  );
}


