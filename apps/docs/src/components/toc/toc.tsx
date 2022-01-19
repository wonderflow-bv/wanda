import React, { Children, ReactNode } from 'react'
import { Icon, Stack, Text, Title } from '@wonderflow/react-components'
import slugify from 'slugify'
import clsx from 'clsx'

import { ToC as ToCClass, ToCItem, QuickNav } from './toc.module.css'

type ToCTableProps = {
  content?: ReactNode;
} & PropsWithClass

type ToCItemProps = {
  text: string;
} & PropsWithClass

export const ToC: {
  Table: React.FC<ToCTableProps>;
  Li: React.FC<ToCItemProps>
} = {
  Table: ({ className, content, ...props }) => {
    const titles = Children.toArray(content).filter((item: { props: any }) => /h2/g.test(item.props.mdxType))
    return (
      <Stack
        data-toc-has-titles={titles.length > 0}
        rowGap={16}
        inline
        className={clsx(ToCClass, className)}
        {...props}
      >
        {(titles.length > 0) && <Title level="6" className={QuickNav}>Quick nav</Title>}
        <Stack as="ul" rowGap={8}>
          {titles.map((child: { props: any }) => (
            <ToC.Li key={child.props.children} text={child.props.children} />
          ))}
        </Stack>
      </Stack>
    )
  },

  Li: ({ className, text, ...props }) => (
    <li className={clsx(ToCItem, className)} {...props}>
      <Icon name="turn-down-right" dimension={24} />
      <Text as="a" size={22} href={`#${slugify(text[0], { lower: true })}`}>{text[0].replace('#', '')}</Text>
    </li>
  )
}

ToC.Table.displayName = 'Toc.Table'
ToC.Li.displayName = 'Toc.Li'
