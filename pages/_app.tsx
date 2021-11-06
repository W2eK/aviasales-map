import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';
import { StoreProvider } from 'store/context';
import { PageProvider } from 'context/page-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background>
        <PageProvider pageProps={pageProps}>
          <StoreProvider>
            <MapContainer />
            <Component {...pageProps} />
          </StoreProvider>
        </PageProvider>
      </Background>
    </>
  );
}
export default MyApp;
