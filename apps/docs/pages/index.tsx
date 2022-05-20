import { Stack, Title } from '@wonderflow/react-components';
import type { NextPage } from 'next';
import mentions from 'src/data/mentions';

import { Carousel } from '@/components/home/carousel';
import { Hero } from '@/components/home/hero';
import { MentionCard } from '@/components/shared/mention-card';
import { Meta } from '@/components/shared/meta';
import { Section } from '@/components/shared/section';
import { getPageStaticProps } from '@/core/get-page-props';

const Home: NextPage = () => (
  <>
    <Meta />
    <Hero />
    <Section vAlign="start" rowGap={24} fill={false} vPadding={32}>
      <Stack hAlign="center">
        <Title as="h2" level="5">Mentioned and shared by</Title>
      </Stack>
      <Carousel>
        {mentions.map(m => (
          <MentionCard
            image={m.image}
            name={m.name}
            handle={m.handle}
          />
        ))}
      </Carousel>
    </Section>
  </>
);

export default Home;

export const getStaticProps = getPageStaticProps({
  layout: 'blank',
  layoutProps: {
    absoluteHeader: true,
  },
});
