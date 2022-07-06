import { Table } from '@wonderflow/react-components';
import { FC, useMemo } from 'react';

import { Markdown } from '@/components/shared/markdown';

type KeyType = {
  name: string;
  description: string;
}

type KeyTableProps = {
  data: KeyType[];
}

export const KeyTable: FC<KeyTableProps> = ({
  data,
}) => {
  const COLUMNS = useMemo(() => [
    {
      id: 'name',
      Header: 'Name',
      accessor: (row: KeyType) => <Markdown>{`<kbd>${row.name}</kbd>`}</Markdown>,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: (row: KeyType) => row.description,
    },
  ], []);

  return (
    <Table columns={COLUMNS} data={data} />
  );
};
