import { PageProps } from 'interfaces/city.interface';
import { useRouter } from 'next/router';
import { Dispatch, useEffect } from 'react';
import {
  Action,
  resetState,
  setCurrentParam,
  setDistrictHover,
  setPageState,
  setPoiHover
} from './actions';
import { StoreState } from './reducer';
import { PoiParams } from 'pages/[city]/[category]/[poi]';

type ControllerProps = {
  state: StoreState;
  dispatch: Dispatch<Action>;
  pageProps: PageProps;
};

export const useStoreController = (props: ControllerProps) => {
  const { state, dispatch, pageProps } = props;
  const router = useRouter();
  const { city, category, poi }: Partial<PoiParams> = router.query;

  useEffect(() => {
    const currentCity = city || null;
    dispatch(setCurrentParam({ currentCity }));
  }, [city]);

  useEffect(() => {
    const currentCategory = category || null;
    dispatch(setCurrentParam({ currentCategory }));
  }, [category]);

  useEffect(() => {
    const currentPoi = poi === undefined ? null : +poi;
    dispatch(setCurrentParam({ currentPoi }));
  }, [poi]);

  useEffect(() => {
    // Determine page type
    const isMainPage = 'page' in pageProps;
    const isDetailPage =
      isMainPage && (pageProps.page === 'category' || pageProps.page === 'poi');
    dispatch(setPageState({ isMainPage, isDetailPage }));

    // Reset hover states
    if (isDetailPage) {
      const { hoverPoi, hoverDistrict } = state;
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
};
