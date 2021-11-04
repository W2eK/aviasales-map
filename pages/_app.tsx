import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';
import { StoreProvider } from 'store/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background>
        <StoreProvider pageProps={pageProps}>
          <MapContainer {...pageProps} />
          <Component {...pageProps} />
        </StoreProvider>
      </Background>
    </>
  );
}
export default MyApp;
