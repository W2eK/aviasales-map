import { PageProps } from 'interfaces/props.interface';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { isDev } from 'utils/is-dev';
import { Action } from './actions';
import { useStoreController } from './controller';
import { storeReducer } from './reducer';
import {
  InternalState,
  DetailsPageState,
  initialState,
  MainPageState,
  StoreState
} from './state';

type StoreContextProps = {
  state: StoreState;
  dispatch: Dispatch<Action>;
};

export type MainPageContext = StoreContextProps & {
  state: InternalState & MainPageState;
};
export type DetailsPageContext = StoreContextProps & {
  state: InternalState & DetailsPageState;
};

export const StoreContext = createContext<StoreContextProps>(
  {} as StoreContextProps
);

export const StoreProvider: FC<{
  pageProps: PageProps;
}> = ({ children, pageProps }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  if (typeof window !== 'undefined' && isDev) {
    (window as any).state = state;
    (window as any).pageProps = pageProps;
    (window as any).getCamera = () =>
      `${state.currentCity?.toUpperCase()}: ` +
      JSON.stringify({
        // @ts-ignore
        id: state.hoverDistrict,
        // @ts-ignore
        bearing: map.getBearing(),
        // @ts-ignore
        zoom: map.getZoom()
      }).replaceAll('"', '');
  }

  useStoreController({ state, dispatch, pageProps });
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
