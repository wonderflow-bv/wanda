import React from 'react'
import { Title, Stack } from '@wonderflow/react-components'
import {
  HintCard as HintCardClass,
  ImageContainer, Separator, Title as TitleClass
} from './hint-card.module.css'
import { ThemedImg } from '../themed-img'

export type HintCardProps = PropsWithClass & {
  isBad?: boolean;
  image: string;
}

export const HintCard: React.FC<HintCardProps> = ({
  children,
  isBad = false,
  image
}) => {
  const title = !isBad ? 'Do' : "Don't"

  return (
    <Stack
      as="figure"
      fill={false}
      className={HintCardClass}
      verticalAlign="start"
      data-isbad={isBad}
      rowGap={8}
    >
      <div className={ImageContainer}>
        <ThemedImg src={image} />
      </div>
      <div className={Separator} />
      <Title level="6" className={TitleClass}>{title}</Title>
      {children && <figcaption>{children}</figcaption>}
    </Stack>
  )
}
