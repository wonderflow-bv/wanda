import { Checkbox } from '@/components'
import styles from './table.module.css'

export const TableCheckbox = ({ ...otherProps }) => (
  <Checkbox
    className={styles.Checkbox}
    dimension="small"
    {...otherProps}
  />
)
