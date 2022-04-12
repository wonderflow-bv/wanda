import { Children, cloneElement, Fragment, isValidElement, PropsWithChildren } from 'react'

export type AspectRatioProps = PropsWithChildren<PropsWithClass> & {
  ratio: string;
}

export const AspectRatio = ({
  children,
  ratio
}: AspectRatioProps) => {
  return (
    <Fragment>
      {Children.map(children, (child) => isValidElement(child) && cloneElement(
        child,
        { style: { ...child.props.style, aspectRatio: ratio } }
      ))}
    </Fragment>
  )
}
