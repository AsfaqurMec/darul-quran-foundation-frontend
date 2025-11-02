import FiltersBar from '@/components/admin/FiltersBar';
import StatCard from '@/components/admin/StatCard';

function buildDonationStats(range: { preset: string }) {
  const now = Date.now();
  const factor = range.preset === 'today' ? 1 : range.preset === 'week' ? 7 : range.preset === 'month' ? 30 : 365;
  return {
    totalAmount: (now % 100000) * factor,
    donors: (now % 500) + 100,
    recurring: (now % 200) + 40,
  };
}

export default function AdminOverview(): JSX.Element {
  const initialRange = { preset: 'month' } as const;
  const stats = buildDonationStats(initialRange);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
      <FiltersBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Donations" value={`৳ ${stats.totalAmount.toLocaleString()}`} subtitle="Filtered" />
        <StatCard title="Active Donors" value={stats.donors} />
        <StatCard title="Recurring Donors" value={stats.recurring} />
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Recent Donations (mock)</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr><th className="py-2 pr-4">Date</th><th className="py-2 pr-4">Donor</th><th className="py-2 pr-4">Amount</th></tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-t"><td className="py-2 pr-4">2025-08-{10+i}</td><td className="py-2 pr-4">Donor {i+1}</td><td className="py-2 pr-4">৳ {(i+1)*1000}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


