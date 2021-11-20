import { PageProps } from 'interfaces/city.interface';
import { useRouter } from 'next/router';
import { Dispatch, useEffect } from 'react';
import { Action, resetState, setCurrentParam, setPageState } from './actions';
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
    const isMainPage =
      'page' in pageProps &&
      ['city', 'category', 'poi'].includes(pageProps.page);
    const isDetailPage =
      'page' in pageProps && ['category', 'poi'].includes(pageProps.page);
    dispatch(setPageState({ isMainPage, isDetailPage }));
    if (!isMainPage) dispatch(resetState());
  }, [pageProps]);
};
