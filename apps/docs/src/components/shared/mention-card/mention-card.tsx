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
        aria-hidden="true"
      />
    )}
    {...otherProps}
  >
    <Text variant="subtitle-1"><strong>{name}</strong></Text>
    <Text as="span" variant="body-2">
      @
      {handle}
    </Text>
  </Card>
);
