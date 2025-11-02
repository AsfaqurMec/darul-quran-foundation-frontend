import Tabs from '@/components/ui/Tabs';
import MemberApplication from '@/components/get-involved/MemberApplication';

export default function JoinTabs(): JSX.Element {
  return (
    <Tabs
      items={[
        {
          id: 'regular',
          label: 'নিয়মিত দাতা',
          content: (
            <ul className="list-disc pl-5 space-y-1">
              <li>মাসিক অটোপে সেটআপ করে সহজে দান করুন।</li>
              <li>যেকোনো সময় বাতিল/পরিবর্তন করা যাবে।</li>
            </ul>
          ),
        },
        {
          id: 'member',
          label: 'আজীবন ও দাতা সদস্য',
          content: <MemberApplication />,
        },
        {
          id: 'volunteer',
          label: 'স্বেচ্ছাসেবক',
          content: (
            <ul className="list-disc pl-5 space-y-1">
              <li>ইভেন্ট ও ক্যাম্পেইনে স্বেচ্ছাসেবী হিসেবে অংশ নিন।</li>
            </ul>
          ),
        },
      ]}
    />
  );
}


