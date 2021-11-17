import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';
import { StoreProvider } from 'store/context';
import { PageProvider } from 'context/page-context';
import '../components/slider/embla.css';
import { CityLayout } from 'layouts/city';

function MyApp({ Component, pageProps }: AppProps) {
  const isMainPage =
    pageProps.page === 'city' ||
    pageProps.page === 'category' ||
    pageProps.page === 'poi';
  return (
    <>
      <GlobalStyle />
      <Background>
        <PageProvider pageProps={pageProps}>
          <StoreProvider>
            <MapContainer />
            <Component {...pageProps} />
            {isMainPage ? <CityLayout /> : null}
          </StoreProvider>
        </PageProvider>
      </Background>
    </>
  );
}
export default MyApp;
