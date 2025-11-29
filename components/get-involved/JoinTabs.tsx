'use client';

import Tabs from '../../components/ui/Tabs';
import MemberApplication from '../../components/get-involved/MemberApplication';
import RegularDonorTab from '../../components/get-involved/RegularDonorTab';
import LifetimeMemberTab from '../../components/get-involved/LifetimeMemberTab';
import VolunteerTab from '../../components/get-involved/VolunteerTab';
import { useI18n } from '../../components/i18n/LanguageProvider';

export default function JoinTabs(): JSX.Element {
  const { t } = useI18n();

  return (
    <Tabs
      items={[
        {
          id: 'regular',
          label: t('regularDonor'),
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
            </svg>
          ),
          content: <RegularDonorTab />,
        },
        {
          id: 'member',
          label: t('lifetimeMember'),
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M7 4h10a1 1 0 0 1 1 1v6H6V5a1 1 0 0 1 1-1zm-1 9h12v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6z" />
              <path d="M9 13h6v2H9z" />
            </svg>
          ),
          content: <LifetimeMemberTab />,
        },
        {
          id: 'volunteer',
          label: t('volunteer'),
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M7 11V7a2 2 0 1 1 4 0v4h2V6a2 2 0 1 1 4 0v5h2v9H5v-9h2z" />
              <circle cx="9" cy="4" r="1" />
              <circle cx="15" cy="4" r="1" />
            </svg>
          ),
          content: <VolunteerTab />,
        },
      ]}
    />
  );
}


