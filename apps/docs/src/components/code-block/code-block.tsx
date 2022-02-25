/* eslint-disable react/no-array-index-key */
import { Button, Text, Stack } from '@wonderflow/react-components'
import clsx from 'clsx'
import rangeParser from 'parse-numeric-range'
import Refractor from 'react-refractor'
import React, { useCallback, ReactNode } from 'react'

// Load any languages you want to use from `refractor`
import js from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import css from 'refractor/lang/css'
import jsx from 'refractor/lang/jsx'
import tsx from 'refractor/lang/tsx'
import json from 'refractor/lang/json'
import html from 'refractor/lang/markup'
import bash from 'refractor/lang/bash'
import diff from 'refractor/lang/diff'

import { CodeBlock as CodeBlockClass, Action, Toolbar } from './code-block.module.css'

Refractor.registerLanguage(js)
Refractor.registerLanguage(css)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(tsx)
Refractor.registerLanguage(json)
Refractor.registerLanguage(html)
Refractor.registerLanguage(typescript)
Refractor.registerLanguage(bash)
Refractor.registerLanguage(diff)

type CodeBlockProps = {
  children: any;
  highlight?: string;
  hideCopy?: boolean;
  language?: string;
  showLanguage?: boolean;
  actions?: ReactNode;
} & PropsWithClass

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  highlight,
  hideCopy = false,
  language,
  className,
  actions,
  showLanguage = true
}) => {
  const isNotString = typeof children !== 'string'
  const codeLang = isNotString ? children?.props.className.replace(/(lang|language)-/g, '') : className?.replace(/(lang|language)-/g, '')

  const copyContent = useCallback(
    () => () => {
      navigator.clipboard.writeText(children)
    },
    [children]
  )

  const formattedChildren = isNotString ? children.props.children.trim() : children.trim()

  return (
    <div
      className={clsx(CodeBlockClass, className)}
      data-code-block-has-highlight={Boolean(highlight)}
      data-code-block-has-toolbar={(showLanguage || codeLang) || Boolean(actions) || !hideCopy}
    >
      <Refractor language={language || codeLang} value={formattedChildren} markers={highlight ? rangeParser(highlight) : undefined} />
      <Stack direction="row" fill={false} horizontalAlign="space-between" verticalAlign="center" className={Toolbar}>
        {(codeLang && showLanguage) && <Text responsive={false} size={14} dimmed={5}>{codeLang}</Text>}
        <span />

        <Stack direction="row" rowGap={8}>
          {!hideCopy && (
            <Button
              className={Action}
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
  )
}
