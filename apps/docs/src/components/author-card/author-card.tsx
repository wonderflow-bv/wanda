import { Avatar, Stack, Text } from '@wonderflow/react-components'
import clsx from 'clsx'
import { formatRole } from '@/utils/formatters'

import { AuthorCard as AuthorCardClass, AuthorInfo } from './author-card.module.css'

type AuthorCardProps = PropsWithClass & {
  avatar?: string;
  name: string;
  role?: string;
  collapsed?: boolean;
}

export const AuthorCard = ({
  avatar,
  name,
  role,
  className,
  collapsed = false,
  ...props
}: AuthorCardProps) => {
  return (
    <Stack
      className={clsx(AuthorCardClass, className)}
      direction="row"
      verticalAlign="center"
      horizontalAlign="start"
      data-author-card-collapsed={collapsed}
      fill={false}
      style={{ lineHeight: 1 }}
      {...props}
    >
      <Avatar src={avatar} />
      <Stack rowGap={2} className={AuthorInfo}>
        <Text size={16} weight="bold">{name}</Text>
        {role && <Text responsive={false} size={14} dimmed={5}>{formatRole(role)}</Text>}
      </Stack>
    </Stack>
  )
}
