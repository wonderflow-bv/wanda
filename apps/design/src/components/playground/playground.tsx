import { LiveCodeProps } from '@/components/live-code'
import dynamic from 'next/dynamic'

export const DynLiveCode = dynamic<LiveCodeProps>(
  import('@/components/live-code').then((m) => m.LiveCode),
  { ssr: false }
)

export type PlaygroundProps = LiveCodeProps & {}

export const Playground = ({
  liveAreaProps,
  ...props
}: PlaygroundProps) => (
  <DynLiveCode
    liveAreaProps={liveAreaProps}
    {...props}
  />
)
