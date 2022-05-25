/* eslint-disable react/no-array-index-key */
import { Button, Stack, Text } from '@wonderflow/react-components';
import clsx from 'clsx';
import rangeParser from 'parse-numeric-range';
import React, { CSSProperties, ReactNode, useCallback } from 'react';
import Refractor from 'react-refractor';
import bash from 'refractor/lang/bash';
import css from 'refractor/lang/css';
import diff from 'refractor/lang/diff';
// Load any languages you want to use from `refractor`
import js from 'refractor/lang/javascript';
import json from 'refractor/lang/json';
import jsx from 'refractor/lang/jsx';
import html from 'refractor/lang/markup';
import tsx from 'refractor/lang/tsx';
import typescript from 'refractor/lang/typescript';

import styles from './code.module.css';

Refractor.registerLanguage(js);
Refractor.registerLanguage(css);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(json);
Refractor.registerLanguage(html);
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(diff);

type CodeProps = {
  children: any;
  highlight?: string;
  hideCopy?: boolean;
  language?: string;
  showLanguage?: boolean;
  actions?: ReactNode;
  background?: string;
} & PropsWithClass

export const Code: React.FC<CodeProps> = ({
  children,
  highlight,
  hideCopy = false,
  language,
  className,
  actions,
  background = 'transparent',
  showLanguage = true,
}) => {
  const isNotString = typeof children !== 'string';
  const codeLang = isNotString ? children?.props.className.replace(/(lang|language)-/g, '') : className?.replace(/(lang|language)-/g, '');

  const copyContent = useCallback(
    () => () => {
      void navigator.clipboard.writeText(children);
    },
    [children],
  );

  const formattedChildren = isNotString ? children.props.children.trim() : children.trim();

  const dynamicStyle: CSSProperties = {
    '--code-bg': background,
  };

  return (
    <div
      className={clsx(styles.Code, className)}
      data-code-block-has-highlight={Boolean(highlight)}
      data-code-block-has-toolbar={(showLanguage || codeLang) || Boolean(actions) || !hideCopy}
      style={dynamicStyle}
    >
      <Refractor
        language={language ?? codeLang}
        value={formattedChildren}
        markers={highlight ? rangeParser(highlight) : undefined}
      />

      <Stack direction="row" fill={false} hAlign="space-between" vAlign="center" className={styles.Toolbar}>
        {(codeLang && showLanguage) && <Text responsive={false} size={14} dimmed={5}>{codeLang}</Text>}
        <span />

        <Stack direction="row" rowGap={8}>
          {!hideCopy && (
            <Button
              className={styles.Action}
              dimension="small"
              kind="flat"
              onClick={copyContent()}
            >
              Copy
            </Button>
          )}
          {actions}
        </Stack>
      </Stack>
    </div>
  );
};
