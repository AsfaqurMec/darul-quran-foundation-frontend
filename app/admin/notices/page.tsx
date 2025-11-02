import CrudTable from '@/components/admin/CrudTable';

type Row = { id: string; title: string; date: string; tag: string };

const initialRows: Row[] = [
  { id: 'n1', title: 'শিক্ষক প্রশিক্ষণ প্রোগ্রাম', date: '2025-08-23', tag: 'কোর্স' },
  { id: 'n2', title: 'স্কলারশিপ আবেদন চলছে', date: '2025-07-10', tag: 'স্কলারশিপ' },
];

export default function AdminNotices(): JSX.Element {
  return (
    <CrudTable<Row>
      title="Notices"
      columns={[{ key: 'title', label: 'Title' }, { key: 'date', label: 'Date' }, { key: 'tag', label: 'Tag' }]}
      initialRows={initialRows}
    />
  );
}


