import '@docsearch/css';
import '@wonderflow/themes';
import '@wonderflow/react-components/core.css';
import '@/styles/app.css';
import '@/styles/docsearch.css';

import { IdProvider } from '@wonderflow/react-components';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextScript from 'next/script';
import NextProgress from 'next-progress';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

import { BlankLayout } from '@/components/layouts/blank-layout';
import { DocLayout } from '@/components/layouts/doc-layout';
import { ResponsiveProvider } from '@/context/responsive';

const LAYOUTS = {
  blank: BlankLayout,
  doc: DocLayout,
};

const Providers: FCChildren = ({ children }) => (
  <ThemeProvider defaultTheme="dark" disableTransitionOnChange>
    <ResponsiveProvider>
      <IdProvider>
        {children}
      </IdProvider>
    </ResponsiveProvider>
  </ThemeProvider>
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
      <NextScript id="docsearch-core" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" strategy="beforeInteractive" />
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

