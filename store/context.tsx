import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useMemo,
  useReducer
} from 'react';
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
  const [state, dispatch] = useReducer(storeReducer, initialState);
  if (typeof window !== 'undefined') (window as any).state = state;
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
