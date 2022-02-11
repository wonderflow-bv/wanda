import { forwardRef, useEffect, useRef } from 'react'
import { Polymorphic } from '@/components'

type CheckboxProps = PropsWithClass & {

}

type PolymorphicCheckbox = Polymorphic.ForwardRefComponent<'div', CheckboxProps>;

export const Checkbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
) as PolymorphicCheckbox
