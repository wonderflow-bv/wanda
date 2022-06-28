import { Table, TableProps } from '@wonderflow/react-components';
import { FC, useMemo } from 'react';

import { Markdown } from '@/components/shared/markdown';

type KeyType = {
  name: string;
  description: string;
}

export const KeyTable: FC<TableProps<KeyType>> = ({
  data,
}) => {
  const COLUMNS = useMemo(() => [
    {
      id: 'name',
      Header: 'Name',
      accessor: (row: KeyType) => <Markdown>{`\`${row.name}\``}</Markdown>,
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
