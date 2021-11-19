import { PageProps } from 'interfaces/city.interface';
import { useRouter } from 'next/router';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { Action } from './actions';
import { useStoreController } from './controller';
import { initialState, storeReducer, StoreState } from './reducer';

type StoreContextProps = {
  state: StoreState;
  dispatch: Dispatch<Action>;
  pageProps: PageProps;
};

export const StoreContext = createContext<StoreContextProps>(
  {} as StoreContextProps
);

export const StoreProvider: FC<{
  pageProps: PageProps;
}> = ({ children, pageProps }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  if (typeof window !== 'undefined') (window as any).state = state;

  useStoreController({ state, dispatch, pageProps });
  return (
    <StoreContext.Provider value={{ state, dispatch, pageProps }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
