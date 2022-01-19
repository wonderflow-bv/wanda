import React, { useMemo, useState } from 'react'
import { Stack, Title, Text, Toggle } from '@wonderflow/react-components'
import { ColorPalette as ColoPaletteClass, Drop, White, ColorValue } from './color-palette.module.css'
import { fromString } from 'css-color-converter'
import { useUIDSeed } from 'react-uid'
import clsx from 'clsx'

type ColorPaletteProps = {
  colors: Record<string, any>;
  title?: string;
  id?: string;
  threshold?: number;
}

const HexColor = (color: string) => {
  const formattedColor = color.startsWith('hsl') ? color.split(' ').join(', ').replace('/,', '') : color
  const hexColor = fromString(formattedColor).toHexString()

  return hexColor
}

export const ColorPalette = ({
  colors,
  title,
  threshold = 40,
  id,
  ...props
}: ColorPaletteProps) => {
  const uid = useUIDSeed()
  const [showHex, setShowHex] = useState(false)
  const colorArray = useMemo(() => Object.keys(colors), [colors])

  return (
    <Stack rowGap={16} className={ColoPaletteClass}>
      <Stack direction="row" fill={false} verticalAlign="center" horizontalAlign="space-between">
        <Title as="span" level="5">{title}</Title>
        <Stack direction="row" fill={false} columnGap={8} verticalAlign="center">
          <Text as="label" htmlFor={uid('palette-color-format')} weight="bold" size={14}>{showHex ? 'HEX' : 'HSL'}</Text>
          <Toggle id={uid('palette-color-format')} onClick={() => setShowHex(!showHex)} dimension="small" />
        </Stack>
      </Stack>

      <Stack
        as="ul"
        direction="column"
        fill={false}
        data-elevation="1"
        {...props}
      >
        {colorArray.map((item: string) => (
          <Stack
            as="li"
            key={colors[item]}
            style={{ backgroundColor: `hsl(${colors[item]})` }}
            className={clsx(Drop, (parseInt(item) >= threshold || item === 'black') && White)}
            direction="row"
            horizontalAlign="space-between"
            verticalAlign="center"
            columnGap={16}
            fill={false}
          >
            <Text weight="bold">{item}</Text>
            <Text size={14} className={ColorValue}>
              {
              showHex ? HexColor(`hsl(${colors[item]})`) : `hsl(${colors[item]})`
              }
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
