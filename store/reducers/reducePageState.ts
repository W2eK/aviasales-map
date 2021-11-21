import { PageProps } from 'interfaces/props.interface';
import { initialState, StoreState } from 'store/state';

/*
useEffect(() => {
    // Determine page type
    const isMainPage = 'page' in pageProps;
    const isDetailPage =
      isMainPage && (pageProps.page === 'category' || pageProps.page === 'poi');
    dispatch(setPageState({ isMainPage, isDetailPage }));

    // Reset hover states
    if (isDetailPage) {
      const { hoverPoi, hoverDistrict } = state;

      const index = hoverPoi ? pageProps.order.indexOf(hoverPoi) : -1;
      console.log(index);
      dispatch(setIndex(index));

      if (
        hoverPoi &&
        pageProps.currentCategory !== 'all' &&
        pageProps.poi[hoverPoi].type !== pageProps.currentCategory
      )
        dispatch(setPoiHover(null));
      if (hoverDistrict && pageProps.currentCategory !== 'districts')
        dispatch(setDistrictHover(null));
    }
    if (!isMainPage) dispatch(resetState());
  }, [pageProps]);
*/

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
