import { PageProps } from 'interfaces/props.interface';
import { useRouter } from 'next/router';
import { Dispatch, useEffect } from 'react';
import { Action, setCurrentParam, setPageState } from './actions';
import { PoiParams } from 'pages/[city]/[category]/[poi]';

type ControllerProps = {
  dispatch: Dispatch<Action>;
  pageProps: PageProps;
};

export const useStoreController = (props: ControllerProps) => {
  const { dispatch, pageProps } = props;
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
    dispatch(setPageState(pageProps));
  }, [pageProps]);
};
