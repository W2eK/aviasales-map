import { Action } from './actions';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'pages/[city]';

export type StoreState = {
  hover: number | null;
  pageProps: PagesProps;
};

export type PagesProps = { page: '' } | HomePageProps | CityPageProps;

export const initialState: StoreState = {
  hover: null,
  pageProps: { page: '' }
};

type Reducer = (draft: StoreState, action: Action) => void;

export const storeReducer: Reducer = (draft, action) => {
  switch (action.type) {
    case 'SET_HOVER': {
      draft.hover = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
