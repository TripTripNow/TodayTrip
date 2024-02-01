import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/common/Navbar/Navbar';
import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/variables.css';
import '#/fonts/Pretandard/Pretandard.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>TodayTrip</title>
        <link rel="icon" href="/icons/icon-logo.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <div className="root">
            {!router.pathname.includes('sign') && <Navbar />}
            <div className="content">{getLayout(<Component {...pageProps} />)}</div>
            {!router.pathname.includes('sign') && <Footer />}
          </div>
        </HydrationBoundary>
        <Toaster containerStyle={{ fontSize: '2.5rem', fontWeight: '600' }} />
        <div style={{ fontSize: '16px' }}>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
