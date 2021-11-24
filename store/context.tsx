import { PageProps } from 'interfaces/props.interface';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
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
  if (typeof window !== 'undefined') (window as any).state = state;
  if (typeof window !== 'undefined') (window as any).pageProps = pageProps;

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
