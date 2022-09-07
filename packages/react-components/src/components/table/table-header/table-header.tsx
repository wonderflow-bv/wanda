import { HTMLAttributes } from 'react';

import { Polymorphic, Stack, Title } from '@/components';

import * as styles from './table-header.module.css';

export type TableHeaderProps = HTMLAttributes<HTMLElement> & {
  title?: string | Polymorphic.IntrinsicElement<typeof Title>;
}

export const TableHeader: FCChildren<TableHeaderProps> = ({
  children,
  title,
  id,
  ...otherProps
}) => (
  <Stack
    direction="row"
    columnGap={32}
    vAlign="center"
    hAlign="space-between"
    fill={false}
    className={styles.TableHeader}
    {...otherProps}
  >
    <div>
      {typeof title === 'string' ? <Title id={id} level="5">{title}</Title> : title}
    </div>

    <Stack direction="row" vAlign="center" columnGap={8} inline>
      {children}
    </Stack>
  </Stack>
);
