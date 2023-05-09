import {
  Stack, Text, Toggle,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { fromString } from 'css-color-converter';
import React, { useMemo, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import styles from './color-palette.module.css';

type ColorPaletteProps = {
  colors: Record<string, any>;
  title?: string;
  id?: string;
  threshold?: number;
}

const HexColor = (color: string) => {
  const formattedColor = color.startsWith('hsl') ? color.split(' ').join(', ').replace('/,', '') : color;
  const hexColor = fromString(formattedColor).toHexString();

  return hexColor;
};

export const ColorPalette = ({
  colors,
  title,
  threshold = 40,
  id,
  ...props
}: ColorPaletteProps) => {
  const uid = useUIDSeed();
  const [isShowHex, setIsShowHex] = useState(true);
  const colorArray = useMemo(() => Object.keys(colors), [colors]);

  return (
    <Stack rowGap={16} className={styles.ColorPalette}>
      <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
        <Text as="span" variant="heading-5">{title}</Text>
        <Stack direction="row" fill={false} columnGap={8} vAlign="center">
          <Toggle id={uid('palette-color-format')} label={isShowHex ? 'HEX' : 'HSL'} onClick={() => setIsShowHex(!isShowHex)} dimension="small" />
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
            className={clsx(styles.Drop, (parseInt(item, 10) >= threshold || item === 'black') && styles.White)}
            direction="row"
            hAlign="space-between"
            vAlign="center"
            columnGap={16}
            fill={false}
          >
            <Text><b>{item}</b></Text>
            <Text variant="body-2" className={styles.ColorValue}>
              {
              isShowHex ? HexColor(`hsl(${colors[item]})`) : `hsl(${colors[item]})`
              }
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
