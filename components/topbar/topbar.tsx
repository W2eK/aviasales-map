import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { BackButton } from './back';
import { Header } from './header';
import { Fadeout, Wrapper } from './styled';

export const Topbar: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const title = state.pageProps.title;
  const subtitle =
    state.currentCategory === 'all' && state.hoverType !== null
      ? state.pageProps.categories.find(({ type }) => type === state.hoverType)!
          .title
      : 'subtitle' in state.pageProps
      ? state.pageProps.subtitle
      : null;
      
  return useMemo(() => {
    return (
      <Wrapper>
        <Header title={title!} subtitle={subtitle} />
        <BackButton />
        <Fadeout />
      </Wrapper>
    );
  }, [title, subtitle]);
};
