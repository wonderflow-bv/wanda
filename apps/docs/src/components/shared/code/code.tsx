/* eslint-disable react/no-array-index-key */
import { outdent } from '@mvasilkov/outdent';
import {
  IconButton, Stack, Text,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import rangeParser from 'parse-numeric-range';
import React, {
  CSSProperties, ReactNode, useCallback,
} from 'react';
import Refractor, { Props } from 'react-refractor';
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

export type CodeProps = {
  children: any;
  lines?: string;
  markers?: Props['markers'];
  hideCopy?: boolean;
  language?: string;
  showLanguage?: boolean;
  actions?: ReactNode;
  maxHeight?: string;
}

export const Code: FCChildrenClass<CodeProps> = ({
  children,
  lines,
  markers,
  hideCopy = false,
  language,
  showLanguage = true,
  className,
  actions,
  maxHeight,
  ...otherProps
}) => {
  const cleanedClassname = children?.props?.className?.replace('language-', '');
  const hasLanguage = language ?? cleanedClassname;
  const isNotString = typeof children !== 'string';
  const getChildren = isNotString ? children.props.children.trim() : children.trim();
  const formattedSource = outdent(getChildren);

  const copyContent = useCallback(
    () => {
      void navigator.clipboard.writeText(formattedSource);
    },
    [formattedSource],
  );

  const dynamicStyle: CSSProperties = {
    '--max-height': maxHeight,
  };

  return (
    <div
      className={clsx(styles.Code, className)}
      data-code-block-has-highlight={Boolean(lines)}
      data-code-block-has-toolbar={showLanguage ?? Boolean(actions) ?? hideCopy}
      style={dynamicStyle}
      {...otherProps}
    >
      <Refractor
        language={hasLanguage}
        value={formattedSource}
        markers={lines ? rangeParser(lines) : markers}
      />

      {showLanguage && (
      <Stack direction="row" fill={false} hAlign="space-between" vAlign="center" className={styles.Toolbar}>
        <Text responsive={false} size={14} dimmed={5}>{language ?? ''}</Text>

        <Stack direction="row" rowGap={8}>
          {!hideCopy && (
          <IconButton
            className={styles.Action}
            aria-label="Copy code"
            dimension="small"
            kind="flat"
            onClick={() => copyContent()}
            icon="todo"
          />
          )}
          {actions}
        </Stack>
      </Stack>
      )}
    </div>
  );
};
