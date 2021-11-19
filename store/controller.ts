import { PageProps } from 'interfaces/city.interface';
import { useRouter } from 'next/router';
import { Dispatch, useEffect } from 'react';
import { Action, resetPageProps } from './actions';
import { StoreState } from './reducer';

type ControllerProps = {
  state: StoreState;
  dispatch: Dispatch<Action>;
  pageProps: PageProps;
};

export const useStoreController = (props: ControllerProps) => {
  const { state, dispatch, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    // dispatch(resetPageProps(pageProps));
  }, [pageProps]);
};
