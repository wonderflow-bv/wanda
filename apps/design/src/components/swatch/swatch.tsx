import React, {
  useState, CSSProperties, useCallback, Fragment
} from 'react'
import { fromString } from 'css-color-converter'
import { Text, Stack, Button } from '@wonderflow/react-components'

import { Swatch as SwatchClass, Color, CopyColor, Values } from './swatch.module.css'

type SwatchProps = {
  color: string;
  name: string;
  showCopy?: boolean;
}

export const Swatch: React.FC<SwatchProps> = ({
  color,
  showCopy = true,
  name
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const formattedColor = color.startsWith('hsl') ? color.split(' ').join(', ').replace('/,', '') : color
  const hexColor = fromString(formattedColor).toHexString()
  const hslColor = color

  const changeLabel = useCallback(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = useCallback(
    c => () => {
      navigator.clipboard.writeText(c)
      setIsCopied(true)
      changeLabel()
    },
    [changeLabel]
  )

  const dynamicStyle: CSSProperties = {
    '--backgroundColor': hslColor
  }

  return (
    <Stack rowGap={8} className={SwatchClass} style={dynamicStyle}>
      <Stack
        direction="row"
        columnGap={16}
        className={Color}
        verticalAlign="center"
        horizontalAlign="center"
        fill={false}
      >
        {isCopied
          ? <Text as="b" weight="bold" size={16}>COPIED</Text>
          : showCopy && (
            <Fragment>
              <Button kind="flat" dimension="small" className={CopyColor} onClick={copyToClipboard(hexColor)}>
                <b>COPY HEX</b>
              </Button>
              <Button kind="flat" dimension="small" className={CopyColor} onClick={copyToClipboard(hslColor)}>
                <b>COPY HSL</b>
              </Button>
            </Fragment>
          )}
      </Stack>
      <Stack
        rowGap={16}
        verticalAlign="center"
        horizontalAlign="start"
        fill={false}
      >
        {name && <Text size={16} weight="bold">{name}</Text>}
        <Stack className={Values} columnGap={4}>
          <Text size={14}>{hslColor}</Text>
          <Text size={14}>{hexColor}</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
