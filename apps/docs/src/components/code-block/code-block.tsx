/* eslint-disable react/no-array-index-key */
import { Button, Text, Stack } from '@wonderflow/react-components'
import clsx from 'clsx'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import rangeParser from 'parse-numeric-range'
import React, { useCallback, useRef } from 'react'

import { CodeBlock as CodeBlockClass, Action, Code, Toolbar, LineNumber, LineContent } from './code-block.module.css'
import theme from './wonder-theme'

type CodeBlockProps = {
  children: any;
  highlight?: string;
  hideCopy?: boolean;
  showLineNumbers?: boolean;
} & PropsWithClass

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  highlight,
  showLineNumbers = false,
  hideCopy = false,
  className
}) => {
  const isNotString = typeof children !== 'string'
  const language: Language = isNotString ? children?.props.className.replace(/(lang|language)-/g, '') : className?.replace(/(lang|language)-/g, '')
  const CodeRef = useRef<any>('')

  const copyContent = useCallback(
    () => () => {
      navigator.clipboard.writeText(CodeRef.current.innerText)
    },
    [CodeRef]
  )

  const formattedChildren = isNotString ? children.props.children.trim() : children.trim()

  return (
    <div className={clsx(CodeBlockClass)} data-code-block-has-highlight={Boolean(highlight)}>
      <Highlight {...defaultProps} theme={theme} code={formattedChildren} language={language}>
        {({
          className, style, tokens, getLineProps, getTokenProps
        }) => (
          <>
            <pre ref={CodeRef} className={clsx(Code, className)} style={{ ...style }}>
              {tokens.map((line, i) => (
                // Line
                <div
                  key={i}
                  style={{ display: 'table-row' }}
                  data-code-block-highlight={highlight && rangeParser(highlight).includes(i + 1)}
                  {...getLineProps({ line, key: i })}
                >
                  {/* Line number */}
                  {showLineNumbers && (
                    <span className={LineNumber}>
                      {i + 1}
                    </span>
                  )}
                  <span className={LineContent}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
            <Stack direction="row" fill={false} horizontalAlign="space-between" verticalAlign="center" className={Toolbar}>
              {language && <Text responsive={false} size={14} dimmed={5}>{language}</Text>}
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
            </Stack>
          </>
        )}
      </Highlight>
    </div>
  )
}
