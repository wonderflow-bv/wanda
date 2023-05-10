import {
  IconButton, Stack, Text,
} from '@wonderflow/react-components';
import { fromString } from 'css-color-converter';
import React, {
  CSSProperties,
  useCallback, useState,
} from 'react';

import styles from './swatch.module.css';

type SwatchProps = {
  color: string;
  name: string;
  showCopy?: boolean;
}

export const Swatch: React.FC<SwatchProps> = ({
  color,
  showCopy = true,
  name,
  ...otherProps
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const formattedColor = color.startsWith('hsl') ? color.split(' ').join(', ').replace('/,', '') : color;
  const hexColor = fromString(formattedColor).toHexString();
  const hslColor = color;

  const changeLabel = useCallback(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = useCallback(
    c => () => {
      void navigator.clipboard.writeText(c);
      setIsCopied(true);
      changeLabel();
    },
    [changeLabel],
  );

  const dynamicStyle: CSSProperties = {
    '--background-color': hslColor,
  };

  return (
    <Stack
      className={styles.Swatch}
      rowGap={8}
      style={dynamicStyle}
      vPadding={8}
      hPadding={8}
      {...otherProps}
    >
      <Stack
        direction="row"
        columnGap={16}
        className={styles.Color}
        vAlign="center"
        hAlign="center"
        fill={false}
      >
        {isCopied && <Text as="b">COPIED</Text>}
      </Stack>
      <Stack
        rowGap={8}
        vAlign="center"
        hAlign="start"
        fill={false}
        hPadding={8}
      >
        {name && <Text as="b" variant="body-2">{name}</Text>}
        <Stack className={styles.Values} columnGap={4}>
          <Text variant="body-2">
            {hslColor}
            {showCopy && (
              <IconButton
                aria-label="Copy HSL color code"
                dimension="small"
                kind="flat"
                onClick={copyToClipboard(hexColor)}
                iconColor="var(--highlight-cyan-foreground)"
                icon="document-copy"
              />
            )}
          </Text>
          <Text variant="body-2">
            {hexColor}
            {showCopy && (
              <IconButton
                aria-label="Copy HEX color code"
                dimension="small"
                kind="flat"
                onClick={copyToClipboard(hexColor)}
                iconColor="var(--highlight-cyan-foreground)"
                icon="document-copy"
              />
            )}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
