import {
  Drawer, DrawerProps, OverlayContainer, Stack,
} from '@wonderflow/react-components';
import { useState } from 'react';

type ComponentDrawerProps = DrawerProps

export const ComponentDrawer: FCChildren<ComponentDrawerProps> = ({
  children,
  ...otherProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <OverlayContainer onClose={() => setIsVisible(false)}>
      {isVisible && (
        <Drawer title="Account deletion" {...otherProps}>
          <Stack
            fill={false}
            hAlign="center"
            rowGap={32}
            hPadding={24}
            vPadding={24}
          >
            {children}
          </Stack>
        </Drawer>
      )}
    </OverlayContainer>
  );
};
