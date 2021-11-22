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
    return {
      ...state,
      isMainPage,
      isDetailPage,
      pageProps,
      hoverDistrict: null
    };
  } else {
    const isMainPage = true;
    const isDetailPage = true;
    if (pageProps.currentCategory === 'districts') {
      const index = state.hoverDistrict
        ? pageProps.order.indexOf(state.hoverDistrict)
        : -1;
      const hoverDistrict = index === -1 ? null : state.hoverDistrict;
      const hoverPoi = null;
      return {
        ...state,
        isMainPage,
        isDetailPage,
        pageProps,
        index,
        hoverDistrict,
        hoverPoi
      };
    } else {
      const index = state.hoverPoi
        ? pageProps.order.indexOf(state.hoverPoi)
        : -1;
      const hoverPoi = index === -1 ? null : state.hoverPoi;
      const hoverDistrict = null;
      return {
        ...state,
        isMainPage,
        isDetailPage,
        pageProps,
        index,
        hoverPoi,
        hoverDistrict
      };
    }
  }
};
