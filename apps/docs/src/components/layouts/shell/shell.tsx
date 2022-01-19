import React, { ReactNode, useState, useRef, useCallback, CSSProperties, useEffect } from 'react'
import { Meta } from '@/components/meta'
import { Sidebar } from '@/components/sidebar'
import clsx from 'clsx'
import { Stack, IconButton, Container, Separator, Elevator } from '@wonderflow/react-components'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { Shell, MenuTrigger, Aside, Content, Header, ContentArea, SkipToContent } from './shell.module.css'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { FocusOn } from 'react-focus-on'

type ShellLayoutProps = {
  header?: ReactNode;
  stickyHeader?: boolean;
  showFooter?: boolean;
  contentMaxWidth?: string;
} & PropsWithClass

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

export const ShellLayout: React.FC<ShellLayoutProps> = ({
  children,
  header,
  stickyHeader = false,
  showFooter = true,
  contentMaxWidth = '85ch',
  className,
  ...props
}) => {
  const scrollerRef = useRef<any>(null)
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const handleSidebar = useCallback(
    () => {
      if (collapsed) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
    },
    [collapsed]
  )

  useEffect(() => {
    window.matchMedia(`(min-width: ${tkns.breakpoint.large})`).addEventListener('change', () => {
      setCollapsed(true)
    })
  }, [])

  const dynamycStyle: CSSProperties = {
    '--content-max-width': contentMaxWidth
  }

  return (
    <Stack
      fill={false}
      data-shell-collapsed={collapsed}
      data-shell-sticky-header={stickyHeader}
      direction="row"
      className={clsx(Shell, className)}
      style={dynamycStyle}
      {...props}
    >
      <a href="#content-quicklink" className={SkipToContent}>Skip to main content</a>
      <Meta />

      <FocusOn enabled={!collapsed}>
        <Elevator resting={3}>
          <IconButton
            onClick={() => handleSidebar()}
            icon={collapsed ? 'bars' : 'xmark'}
            dimension="big"
            className={MenuTrigger}
          />
        </Elevator>
        <Stack
          rowGap={88}
          as="header"
          verticalAlign="space-between"
          fill={false}
          className={Aside}
          ref={scrollerRef}
        >
          <Sidebar />
        </Stack>
      </FocusOn>

      <Stack as="main" verticalAlign="start" fill={false} className={Content}>
        {header && <section className={Header}>{header}</section>}
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2, type: 'tween' }}
        >
          <Stack id="content-quicklink" rowGap={80} verticalAlign="start" fill={false}>
            <Container className={ContentArea}>
              {children}
            </Container>
            {showFooter && (
              <>
                <Separator />
                <Container className={ContentArea}>
                  <Footer />
                </Container>
              </>
            )}
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  )
}
