import { forwardRef, ReactNode } from 'react'
import { Banner as BannerClass } from './banner.module.css'
import { Stack, Title, Polymorphic } from '@wonderflow/react-components'

type BannerProps = {
  title: string;
  description?: ReactNode
}

type PolymorphicBanner = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof Stack>,
  Polymorphic.OwnProps<typeof Stack> & BannerProps
>;

// eslint-disable-next-line react/display-name
export const Banner = forwardRef(({
  children,
  title,
  description,
  ...props
}, forwardedRef) => {
  return (
    <Stack
      ref={forwardedRef}
      className={BannerClass}
      rowGap={8}
      horizontalPadding={24}
      verticalPadding={24}
      {...props}
    >
      <Title level="4">{title}</Title>
      {description}
    </Stack>
  )
}) as PolymorphicBanner

Banner.displayName = 'Banner'
