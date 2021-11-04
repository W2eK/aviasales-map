import React from 'react'
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';
import { MapContainer } from 'components/map';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background>
        <MapContainer {...pageProps} />
        <Component {...pageProps} />
      </Background>
    </>
  );
}
export default MyApp;
