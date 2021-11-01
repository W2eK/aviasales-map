import type { AppProps } from 'next/app';
import { GlobalStyle } from 'styles/global';
import { Background } from 'components/background';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background>
        <Component {...pageProps} />
      </Background>
    </>
  );
}
export default MyApp;
