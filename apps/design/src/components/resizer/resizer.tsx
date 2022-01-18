import { Resizable } from 're-resizable'
import React from 'react'

import { Resizer as ResizerClass, Handle } from './resizer.module.css'

type ResizerProps = {
  width?: string;
  height?: number;
  minHeight?: number;
  maxHeight: number;
  padding?: boolean;
  bounds: 'window' | 'parent' | HTMLElement;
  directions: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    topRight: boolean;
    bottomRight: boolean;
    bottomLeft: boolean;
    topLeft: boolean;
  };
}

export const Resizer: React.FC<ResizerProps> = ({
  children,
  width = '100%',
  height = 'auto',
  minHeight = 80,
  maxHeight,
  padding = true,
  bounds = 'window',
  directions = {
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false
  }
}) => {
  return (
    <Resizable
      className={ResizerClass}
      data-resizer-padding={padding}
      minHeight={minHeight}
      maxHeight={maxHeight}
      enable={directions}
      defaultSize={{
        width,
        height
      }}
      bounds={bounds}
      handleStyles={{
        right: { width: 16, right: 0 },
        left: { width: 16, left: 0 }
      }}
      handleClasses={{
        right: Handle,
        left: Handle,
        top: Handle,
        bottom: Handle
      }}
    >
      {children}
    </Resizable>
  )
}
