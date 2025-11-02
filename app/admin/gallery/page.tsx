import CrudTable from '@/components/admin/CrudTable';

type Row = { id: string; src: string; alt: string };

const initialRows: Row[] = [
  { id: 'g1', src: 'https://picsum.photos/seed/1/900/600', alt: 'image 1' },
  { id: 'g2', src: 'https://picsum.photos/seed/2/900/600', alt: 'image 2' },
];

export default function AdminGallery(): JSX.Element {
  return (
    <CrudTable<Row>
      title="Gallery"
      columns={[{ key: 'src', label: 'Image URL' }, { key: 'alt', label: 'Alt text' }]}
      initialRows={initialRows}
    />
  );
}


