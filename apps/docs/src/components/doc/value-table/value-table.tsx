import { Stack, Text } from '@wonderflow/react-components';
import clsx from 'clsx';

import styles from './value-table.module.css';
import { ValueTableRow } from './value-table-row';

export type Prop = {
  name: string;
  description?: string;
  type: string[] | string;
  typeValue?: string;
  typeLink?: string;
}

export type ValueTableProps = PropsWithClass & {
  properties: Prop[];
}

export const ValueTable = ({
  className,
  properties,
  ...otherProps
}: ValueTableProps) => (
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
          <Text as="span" dimmed={6} size={14}>VALUE</Text>
        </div>
        <div role="columnheader" className={styles.Cell}>
          <Text as="span" dimmed={6} size={14}>TYPE</Text>
        </div>
        <div role="columnheader" className={styles.Cell}>
          <Text as="span" dimmed={6} size={14}>DESCRIPTION</Text>
        </div>
      </Stack>
    </div>

    <Stack rowGap={8} role="rowgroup">
      {properties.map(item => item.name && (
        <ValueTableRow key={item.name} {...item} />
      ))}
    </Stack>
  </Stack>
);
