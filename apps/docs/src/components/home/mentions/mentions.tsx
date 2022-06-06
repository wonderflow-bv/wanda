import { Skeleton, Stack, Title } from '@wonderflow/react-components';
import clsx from 'clsx';
import { useMentionsQuery } from 'src/generated/graphql';

import { Carousel } from '@/components/shared/carousel';
import { MentionCard } from '@/components/shared/mention-card';
import { Section } from '@/components/shared/section';

import styles from './mentions.module.css';

export const Mentions: FCClass = ({
  className,
  ...otherProps
}) => {
  const { data, loading } = useMentionsQuery();

  return (
    <Section className={clsx(styles.Mentions)} vAlign="start" rowGap={24} fill={false} vPadding={32} {...otherProps}>
      <Stack hAlign="center">
        <Title as="h2" level="5">Mentioned and shared by</Title>
      </Stack>
      <Carousel>
        {loading
          ? [...Array(10).keys()].map(n => <Skeleton key={n} height={96} width={215} borderRadius={16} />)
          : data?.mentions.map(m => (
            <MentionCard
              key={m.author.name}
              image={m.author.image?.url}
              name={m.author.name}
              handle={m.author.handle}
            />
          ))}
      </Carousel>
    </Section>
  );
};
