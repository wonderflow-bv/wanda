import '@docsearch/css';
import '@wonderflow/themes';
import '@wonderflow/react-components/core.css';
import '@/styles/app.css';
import '@/styles/docsearch.css';

import { ApolloProvider } from '@apollo/client';
import { IdProvider, ResponsiveProvider } from '@wonderflow/react-components';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextProgress from 'next-progress';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

import { BlankLayout } from '@/components/layouts/blank-layout';
import { ComponentLayout } from '@/components/layouts/component-layout';
import { DocLayout } from '@/components/layouts/doc-layout';
import { MDXLayout } from '@/components/layouts/mdx-layout';
import { TocProvider } from '@/hooks/table-of-content';
import { PlaygroundProvider } from '@/src/contexts/playground';
import client from '@/utils/apollo-client';

const LAYOUTS = {
  blank: BlankLayout,
  doc: DocLayout,
  mdx: MDXLayout,
  component: ComponentLayout,
};

const Providers: FCChildren = ({ children }) => (
  <ApolloProvider client={client}>
    <ThemeProvider defaultTheme="dark" disableTransitionOnChange>
      <ResponsiveProvider>
        <PlaygroundProvider>
          <IdProvider>
            <TocProvider>
              {children}
            </TocProvider>
          </IdProvider>
        </PlaygroundProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  </ApolloProvider>
);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const Layout = (pageProps.layout && LAYOUTS[pageProps.layout]) || LAYOUTS.blank;
  const layoutProps = pageProps.layoutProps ?? {};

  const setScrollSmooth = (value: boolean) => {
    document.documentElement.dataset.htmlSmooth = String(value);
  };

  useEffect(() => {
    const handleSmoothScroll = (val: boolean) => () => {
      setScrollSmooth(val);
    };

    router.events.on('routeChangeStart', handleSmoothScroll(false));
    router.events.on('routeChangeComplete', handleSmoothScroll(true));
    router.events.on('routeChangeError', handleSmoothScroll(true));

    return () => {
      router.events.off('routeChangeStart', handleSmoothScroll(false));
      router.events.off('routeChangeComplete', handleSmoothScroll(true));
      router.events.off('routeChangeError', handleSmoothScroll(true));
    };
  }, [router]);

  return (
    <Providers>
      <NextProgress delay={300} color="var(--cta-default)" options={{ showSpinner: false, minimum: 0.3 }} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </Providers>
  );
};

export default App;

