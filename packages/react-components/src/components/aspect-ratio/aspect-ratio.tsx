import {
  Children, cloneElement, isValidElement,
} from 'react';

export type AspectRatioProps = {
  ratio: string;
}

export const AspectRatio: FCChildrenClass<AspectRatioProps> = ({
  children,
  ratio,
}) => (
  <>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child,
      { style: { ...child.props.style, aspectRatio: ratio } },
    ))}
  </>
);
