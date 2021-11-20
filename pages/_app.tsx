import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';
import { StoreProvider } from 'store/context';
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
        <StoreProvider pageProps={pageProps}>
          <MapContainer />
          <Component {...pageProps} />
          {/* {isMainPage ? <CityLayout /> : null} */}
        </StoreProvider>
      </Background>
    </>
  );
}
export default MyApp;
