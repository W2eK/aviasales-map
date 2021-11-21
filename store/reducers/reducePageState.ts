import { PageProps } from 'interfaces/props.interface';
import { initialState, StoreState } from 'store/state';

export const reducePageState = (
  state: StoreState,
  pageProps: PageProps
): StoreState => {
  if (!('page' in pageProps) || pageProps.page === 'index') {
    // RESET STATE
    const isMainPage = false;
    const isDetailPage = false;
    return { ...initialState, isMainPage, isDetailPage, pageProps };
  } else if (pageProps.page === 'city') {
    const isMainPage = true;
    const isDetailPage = false;
    return { ...state, isMainPage, isDetailPage, pageProps };
  } else {
    const isMainPage = true;
    const isDetailPage = true;
    return { ...state, isMainPage, isDetailPage, pageProps };
  }
};
