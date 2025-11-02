import CrudTable from '@/components/admin/CrudTable';

type Row = { id: string; title: string; tag: string; image: string };

const initialRows: Row[] = [
  { id: 'a1', title: 'শীতবস্ত্র বিতরণ', tag: 'নিয়মিত কার্যক্রম', image: 'https://picsum.photos/seed/a/200/120' },
  { id: 'a2', title: 'নলকূপ স্থাপন', tag: 'নিয়মিত কার্যক্রম', image: 'https://picsum.photos/seed/b/200/120' },
];

export default function AdminActivities(): JSX.Element {
  return (
    <CrudTable<Row>
      title="Activities"
      columns={[{ key: 'title', label: 'Title' }, { key: 'tag', label: 'Tag' }, { key: 'image', label: 'Image URL' }]}
      initialRows={initialRows}
    />
  );
}


