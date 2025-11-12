import StatCard from '@/components/cards/StatCard';
import Button from '@/components/ui/button';

function buildStats() {
  // simple deterministic numbers (can be replaced with API later)
  const now = Date.now();
  return {
    usersOnline: (now % 97) + 3,
    lessonsToday: ((Math.floor(now / 1000) % 37) + 10),
    messages: ((Math.floor(now / 5000) % 250) + 50),
  };
}

export default async function DashboardPage(): Promise<JSX.Element> {
  const stats = buildStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600">Overview of current activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Users Online" value={stats.usersOnline} hint="updated live" />
        <StatCard title="Lessons Today" value={stats.lessonsToday} hint="from API" />
        <StatCard title="Messages" value={stats.messages} hint="incoming" />
      </div>

      <form action="/api/logout" method="post">
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}


