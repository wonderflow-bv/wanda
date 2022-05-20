import { Skeleton, Stack, Title } from '@wonderflow/react-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { Carousel } from '@/components/shared/carousel';
import { MentionCardProps } from '@/components/shared/mention-card';
import { Section } from '@/components/shared/section';
import mentions from '@/data/mentions';

import styles from './mentions.module.css';

const DynMentionCard = dynamic<MentionCardProps>(
  async () => import('@/components/shared/mention-card').then(mod => mod.MentionCard),
  {
    ssr: false,
    loading: () => <Skeleton height={96} width={215} borderRadius={16} />,
  },
);

export const Mentions: FCClass = ({
  className,
  ...otherProps
}) => (
  <Section className={clsx(styles.Mentions)} vAlign="start" rowGap={24} fill={false} vPadding={32} {...otherProps}>
    <Stack hAlign="center">
      <Title as="h2" level="5">Mentioned and shared by</Title>
    </Stack>
    <Carousel>
      {mentions.map(m => (
        <DynMentionCard
          key={m.name}
          image={m.image}
          name={m.name}
          handle={m.handle}
        />
      ))}
    </Carousel>
  </Section>
);
