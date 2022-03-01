import { Title, Stack, Polymorphic } from '@/components'
import { FC, HTMLAttributes } from 'react'
import styles from './table-header.module.css'

export type TableHeaderProps = HTMLAttributes<HTMLElement> & {
  title?: string | Polymorphic.IntrinsicElement<typeof Title>
}

export const TableHeader: FC<TableHeaderProps> = ({
  children,
  title,
  id,
  ...otherProps
}) => (
  <Stack
    direction="row"
    columnGap={32}
    verticalAlign="center"
    horizontalAlign="space-between"
    fill={false}
    className={styles.TableHeader}
    {...otherProps}
  >
    <div>
      {typeof title === 'string' ? <Title id={id} level="5">{title}</Title> : title}
    </div>

    <Stack direction="row" verticalAlign="center" columnGap={8} inline>
      {children}
    </Stack>
  </Stack>
)
