'use client';

import StatCard from '@/components/cards/StatCard';
import Button from '@/components/ui/button';
import { useI18n } from '@/components/i18n/LanguageProvider';
import { useEffect, useState } from 'react';

function buildStats() {
  // simple deterministic numbers (can be replaced with API later)
  const now = Date.now();
  return {
    usersOnline: (now % 97) + 3,
    lessonsToday: ((Math.floor(now / 1000) % 37) + 10),
    messages: ((Math.floor(now / 5000) % 250) + 50),
  };
}

export default function DashboardPage(): JSX.Element {
  const { t } = useI18n();
  const [stats, setStats] = useState(buildStats());

  useEffect(() => {
    // Update stats periodically if needed
    const interval = setInterval(() => {
      setStats(buildStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t('dashboard')}</h1>
        <p className="text-gray-600">{t('overviewOfActivity')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title={t('usersOnline')} value={stats.usersOnline} hint={t('updatedLive')} />
        <StatCard title={t('lessonsToday')} value={stats.lessonsToday} hint={t('fromApi')} />
        <StatCard title={t('messages')} value={stats.messages} hint={t('incoming')} />
      </div>

      <form action="/api/logout" method="post">
        <Button type="submit">{t('logout')}</Button>
      </form>
    </div>
  );
}


