import { Avatar, Card, Text } from '@wonderflow/react-components';

type MentionCardProps = {
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
    <Text size={16} weight="bold"><b>{name}</b></Text>
    <Text lineHeight="none" size={14} dimmed={5}>
      @
      {handle}
    </Text>
  </Card>
);
