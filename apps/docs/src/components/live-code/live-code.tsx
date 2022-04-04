import { useEffect, useState } from 'react'
import { LiveProvider, LiveEditor, withLive, LiveProviderProps } from 'react-live'
import theme from '@/components/code-block/wonder-theme'
import { LiveAreaProps, LiveArea } from '@/components/live-area'
import { LiveCode as LiveCodeClass, Editor, Toolbar, LiveArea as LiveAreaClass } from './live-code.module.css'
import { IconButton, Tooltip, Stack, Popover, Snackbar, Text, ToggleButton } from '@wonderflow/react-components'
import { domMax, LazyMotion, m, AnimatePresence } from 'framer-motion'
import { useUIDSeed } from 'react-uid'
import { useDebounce } from 'ahooks'

type LiveCodeComponentProps = {
  onEdit?: any;
  live?: any;
  liveAreaProps?: LiveAreaProps;
  showEditor?: boolean
  onRestore?(): void;
}

const LiveCodeComponent = ({
  live,
  liveAreaProps,
  onEdit,
  onRestore,
  showEditor = false
}: LiveCodeComponentProps) => {
  const [editorVisible, setEditorVisible] = useState(showEditor)
  const uid = useUIDSeed()

  return (
    <div className={LiveCodeClass}>
      <LiveArea className={LiveAreaClass} {...liveAreaProps}>
        {live.element && <live.element />}
      </LiveArea>
      <AnimatePresence>
        <LazyMotion features={domMax} strict>
          {editorVisible && (
          <m.div
            id={uid('live-code-editor')}
            style={{ transformPerspective: '1000px', originY: 0 }}
            initial={{ opacity: 0.8, rotateX: -90, height: 0 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0, height: 'auto' }}
            exit={{ opacity: 0, rotateX: -90, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LiveEditor className={Editor} onChange={onEdit} />
          </m.div>
          )}
        </LazyMotion>
      </AnimatePresence>
      <Stack direction="row" columnGap={8} className={Toolbar}>
        {live.error && (
        <Popover
          placement="bottom-start"
          trigger={<IconButton kind="flat" icon="circle-exclamation" />}
        >
          <Snackbar kind="danger">
            <Text maxWidth="40ch">
              {live.error}
            </Text>
          </Snackbar>
        </Popover>
        )}
        <Tooltip
          trigger={(
            <ToggleButton
              aria-expanded={editorVisible}
              aria-controls={uid('live-code-editor')}
              kind="flat"
              restingIcon="code"
              aria-label="Play with code"
              onClick={() => {
                setEditorVisible(!editorVisible)
              }}
            />
          )}
        >
          Play with code
        </Tooltip>
        <Tooltip
          trigger={
            <IconButton aria-label="Restore code" onClick={onRestore} kind="flat" icon="arrow-rotate-right" />}
        >
          Restore code
        </Tooltip>
      </Stack>
    </div>
  )
}

const LiveComponent = withLive(LiveCodeComponent)

export type LiveCodeProps = LiveProviderProps & LiveCodeComponentProps

export const LiveCode = ({
  code,
  scope = {},
  language = 'jsx',
  liveAreaProps
}: LiveCodeProps) => {
  const [liveCode, setLiveCode] = useState<string | undefined>(code)
  const isStringWrapped = code?.startsWith('`') || code?.startsWith('"')

  useEffect(() => {
    isStringWrapped && setLiveCode(code?.replace(/`(.*)`/mg, '$1'))
  }, [code, isStringWrapped])

  // eslint-disable-next-line no-empty-pattern
  const debouncedLiveCode = useDebounce(
    liveCode,
    { wait: 300 }
  )

  return (
    <LiveProvider language={language} theme={theme} scope={scope} code={debouncedLiveCode}>
      <LiveComponent onRestore={() => setLiveCode(code)} onEdit={setLiveCode} liveAreaProps={liveAreaProps} />
    </LiveProvider>
  )
}
