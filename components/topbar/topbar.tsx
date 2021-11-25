import { FC } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { BackButton } from './back';
import { Header } from './header';
import { Fadeout, Wrapper } from './styled';

export const Topbar: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const title = state.pageProps.title;
  const subtitle =
    state.currentCategory === 'all'
      ? state.pageProps.categories.find(({ type }) => type === state.hoverType)!
          .title
      : 'subtitle' in state.pageProps
      ? state.pageProps.subtitle
      : null;
  return (
    <Wrapper>
      <Header title={title!} subtitle={subtitle} />
      <BackButton />
      <Fadeout />
    </Wrapper>
  );
};
