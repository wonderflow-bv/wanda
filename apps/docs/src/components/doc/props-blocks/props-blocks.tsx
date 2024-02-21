import { Stack, Text } from '@wonderflow/react-components';
import clsx from 'clsx';
import { useMemo } from 'react';
import Refractor from 'react-refractor';

import { PropsBlock } from './props-block';
import styles from './props-blocks.module.css';

export type Prop = {
  name: string;
  description?: string;
  type: string[] | string;
  typeValue?: string;
  typeLink?: string;
  default?: string;
  required?: boolean;
}

export type PropsBlocksProps = PropsWithClass & {
  description?: string;
  properties: Prop[];
}

export const PropsBlocks = ({
  className,
  description,
  properties,
  ...otherProps
}: PropsBlocksProps) => {
  const propertiesSorted = useMemo(() => {
    const required = properties.filter(p => p.required).sort((a, b) => ((a.name < b.name) ? -1 : 1));
    const notRequired = properties.filter(p => !p.required).sort((a, b) => ((a.name < b.name) ? -1 : 1));
    return required.concat(notRequired);
  }, [properties]);

  return (
    <Stack
      className={clsx(styles.TableProps, className)}
      fill={false}
      vAlign="start"
      role="table"
      {...otherProps}
    >

      {description && (
        <Text variant="body-2">
          <Refractor language="typescript" value={description} className={styles.Code} />
        </Text>
      )}

      <Stack rowGap={8} role="rowgroup" style={{ marginTop: '2rem' }}>
        {propertiesSorted.map(item => item.name && (
          <PropsBlock key={item.name} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};
