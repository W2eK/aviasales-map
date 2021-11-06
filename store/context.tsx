import { createContext, Dispatch, FC, useContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { Action } from './actions';
import { initialState, storeReducer, StoreState } from './reducer';

type StoreContextProps = {
  state: StoreState;
  dispatch: Dispatch<Action>;
};

export const StoreContext = createContext<StoreContextProps>(
  {} as StoreContextProps
);

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreState = () => {
  return useContext(StoreContext);
};
