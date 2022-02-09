import clsx from 'clsx'
import styles from './props-table.module.css'
import { Stack, Text } from '@wonderflow/react-components'
import { PropsTableRow } from './props-table-row'

export type Prop = {
  name: string
  description?: string
  type: string[] | string
  typeValue?: string
  typeLink?: string
  default?: string
  required?: boolean
}

export type PropsTableProps = PropsWithClass & {
  properties: Array<Prop>
}

export const PropsTable = ({
  className,
  properties,
  ...otherProps
}: PropsTableProps) => {
  return (
    <Stack
      className={clsx(styles.TableProps, className)}
      fill={false}
      verticalAlign="start"
      role="table"
      {...otherProps}
    >
      <div role="rowgroup">
        <Stack
          verticalAlign="center"
          direction="row"
          columnGap={4}
          role="row"
        >
          <div role="columnheader" className={styles.Cell} />
          <div role="columnheader" className={styles.Cell}>
            <Text as="span" weight="bold" dimmed={6}>Property</Text>
          </div>
          <div role="columnheader" className={styles.Cell}>
            <Text as="span" weight="bold" dimmed={6}>Type</Text>
          </div>
          <div role="columnheader" className={styles.Cell} data-content-align="right">
            <Text as="span" weight="bold" dimmed={6}>Default</Text>
          </div>
        </Stack>
      </div>

      <Stack rowGap={8} role="rowgroup">
        {properties.map(item => item.name && (
          <PropsTableRow key={item.name} {...item} />
        ))}
      </Stack>
    </Stack>
  )
}
