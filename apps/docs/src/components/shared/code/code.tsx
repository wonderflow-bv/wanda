/* eslint-disable react/no-array-index-key */
import { Button, Stack, Text } from '@wonderflow/react-components';
import clsx from 'clsx';
// import outdent from 'outdent';
import rangeParser from 'parse-numeric-range';
import React, {
  CSSProperties, ReactNode, useCallback,
} from 'react';
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
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(diff);
Refractor.registerLanguage(html);

type CodeProps = {
  children: string;
  highlight?: string;
  hideCopy?: boolean;
  language?: string;
  showLanguage?: boolean;
  actions?: ReactNode;
  background?: string;
} & PropsWithClass

export const Code: FCChildrenClass<CodeProps> = ({
  children,
  highlight,
  hideCopy = false,
  language,
  className,
  actions,
  background = 'transparent',
  showLanguage = true,
}) => {
  const hasLanguage = language ?? 'bash';
  const copyContent = useCallback(
    () => () => {
      void navigator.clipboard.writeText(children);
    },
    [children],
  );

  const dynamicStyle: CSSProperties = {
    '--code-bg': background,
  };

  return (
    <div
      className={clsx(styles.Code, className)}
      data-code-block-has-highlight={Boolean(highlight)}
      data-code-block-has-toolbar={Boolean(hasLanguage) ?? Boolean(actions) ?? hideCopy}
      style={dynamicStyle}
    >
      <Refractor
        language={hasLanguage}
        value={children.trim()}
        markers={highlight ? rangeParser(highlight) : undefined}
      />

      <Stack direction="row" fill={false} hAlign="space-between" vAlign="center" className={styles.Toolbar}>
        {(showLanguage) && <Text responsive={false} size={14} dimmed={5}>{language ?? ''}</Text>}

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
