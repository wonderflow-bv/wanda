import { forwardRef } from 'react'
import { Banner as BannerClass, Icon as IconClass } from './banner.module.css'
import { Card, Icon, IconProps, Polymorphic } from '@wonderflow/react-components'

type BannerProps = {
  icon?: IconProps['source']
}

type PolymorphicBanner = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof Card>,
  Polymorphic.OwnProps<typeof Card> & BannerProps
>;

// eslint-disable-next-line react/display-name
export const Banner = forwardRef(({
  children,
  icon,
  ...props
}, forwardedRef) => {
  return (
    <Card
      ref={forwardedRef}
      className={BannerClass}
      bordered
      padding={32}
      highlightOnHover
      left={icon && <Icon className={IconClass} dimension={40} weight="duotone" source={icon} />}
      {...props}
    >
      {children}
    </Card>
  )
}) as PolymorphicBanner

Banner.displayName = 'Banner'
