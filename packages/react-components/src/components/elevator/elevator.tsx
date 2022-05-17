import {
  Children, cloneElement, isValidElement, ReactElement,
} from 'react';

export type ElevatorProps = {
  /**
   * Set the elevation of the component when is resting.
  */
  resting: 0 | 1 | 2 | 3 | 4;
  /**
   * Set the elevation of the component when is hovered.
   */
  hover?: 0 | 1 | 2 | 3 | 4;
  /**
   * The content to be elevated.
   * This component doesn't generate any wrapper.
   * It just applies the elevation by adding the respective attribvtes to the children.
   */
  children: ReactElement;
}

export const Elevator: FCChildren<ElevatorProps> = ({
  children,
  resting,
  hover,
}) => (
  <>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child,
      {
        'data-elevation': resting,
        'data-elevation-hover': hover,
      },
    ))}
  </>
);
