import clsx from 'clsx'
import React from 'react'
import Zoom from 'react-medium-image-zoom'
import { UncontrolledProps } from 'react-medium-image-zoom/dist/cjs/Uncontrolled'
import 'react-medium-image-zoom/dist/styles.css'
import { Zoomer as ZoomerClass } from './zoomer.module.css'

type ZoomerProps = UncontrolledProps

export const Zoomer: React.FC<ZoomerProps> = ({
  children,
  zoomMargin = 16,
  ...props
}) => {
  return (
    <div className={clsx(ZoomerClass)} {...props}>
      <Zoom
        overlayBgColorEnd="var(--global-vibrancy-background)"
        overlayBgColorStart="var(--global-vibrancy-background)"
        zoomMargin={zoomMargin}
      >
        {children}
      </Zoom>
    </div>
  )
}
