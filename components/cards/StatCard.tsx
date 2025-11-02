import CardBox from '@/components/CardBox';

export default function StatCard({ title, value, hint }: { title: string; value: number | string; hint?: string }): JSX.Element {
  return (
    <CardBox title={title}>
      <div className="text-3xl font-bold">{value}</div>
      {hint ? <div className="text-xs text-gray-500 mt-1">{hint}</div> : null}
    </CardBox>
  );
}


