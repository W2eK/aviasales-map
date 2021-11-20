import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';
import { StoreProvider } from 'store/context';
import { MainPageLayout } from 'layouts/main-page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background>
        <StoreProvider pageProps={pageProps}>
          <MapContainer />
          <Component {...pageProps} />
          <MainPageLayout />
        </StoreProvider>
      </Background>
    </>
  );
}
export default MyApp;
