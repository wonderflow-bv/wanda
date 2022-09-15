import {
  Children, cloneElement, isValidElement, ReactElement,
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
      child as ReactElement,
      { style: { ...child.props.style, aspectRatio: ratio } },
    ))}
  </>
);
