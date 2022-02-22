import { ComponentType } from 'react'
import styles from './table-expand.module.css'

export type TableExpandProps<T> = {
  data: T,
  component: ComponentType<T>
}

export const TableExpand = <T, >({
  data,
  component: Component
}: TableExpandProps<T>) => (
  <div className={styles.TableExpand}>
    <div className={styles.ExpandContent}>
      {Component ? <Component {...data} /> : null}
    </div>
  </div>
  )
