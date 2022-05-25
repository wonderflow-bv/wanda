import { Avatar, Card, Text } from '@wonderflow/react-components';

export type MentionCardProps = {
  image?: string;
  handle?: string;
  name: string;
}

export const MentionCard: FCClass<MentionCardProps> = ({
  image,
  handle,
  name,
  ...otherProps
}) => (
  <Card
    vAlign="center"
    columnGap={16}
    vibrant
    radius={16}
    left={(
      <Avatar
        dimension="big"
        src={image}
        alt={name}
      />
    )}
    {...otherProps}
  >
    <Text lineHeight="none" color="var(--global-vibrancy-foreground)" size={16} weight="bold"><strong>{name}</strong></Text>
    <Text as="span" size={14} dimmed={6}>
      @
      {handle}
    </Text>
  </Card>
);
