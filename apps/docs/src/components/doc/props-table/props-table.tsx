import { Stack, Text } from '@wonderflow/react-components';
import clsx from 'clsx';

import styles from './props-table.module.css';
import { PropsTableRow } from './props-table-row';

export type Prop = {
  name: string;
  description?: string;
  type: string[] | string;
  typeValue?: string;
  typeLink?: string;
  default?: string;
  required?: boolean;
}

export type PropsTableProps = PropsWithClass & {
  properties: Prop[];
}

export const PropsTable = ({
  className,
  properties,
  ...otherProps
}: PropsTableProps) => (
  <Stack
    className={clsx(styles.TableProps, className)}
    fill={false}
    vAlign="start"
    role="table"
    {...otherProps}
  >
    <div role="rowgroup">
      <Stack
        vAlign="center"
        direction="row"
        columnGap={4}
        role="row"
      >
        <div role="columnheader" className={styles.Cell} aria-hidden />
        <div role="columnheader" className={styles.Cell}>
          <Text as="span" variant="subtitle-2">PROPERTY</Text>
        </div>
        <div role="columnheader" className={styles.Cell}>
          <Text as="span" variant="subtitle-2">TYPE</Text>
        </div>
        <div role="columnheader" className={styles.Cell} data-content-align="right">
          <Text as="span" variant="subtitle-2">DEFAULT</Text>
        </div>
      </Stack>
    </div>

    <Stack rowGap={8} role="rowgroup">
      {properties.map(item => item.name && (
        <PropsTableRow key={item.name} {...item} />
      ))}
    </Stack>
  </Stack>
);
