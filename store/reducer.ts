import { Action } from './actions';
import { CategoryType, PoiType } from 'interfaces/data.interface';
import { IATA } from 'interfaces/iata.interface';

export type StoreState = {
  hoverPoi: number | null;
  hoverType: PoiType | null;
  hoverDistrict: number | null;
  currentCity: IATA | null;
  currentCategory: CategoryType | null;
  currentPoi: number | null;
  mapLocked: boolean;
  isDragged: boolean;
  isMainPage: boolean;
  isDetailPage: boolean;
};

export const initialState: StoreState = {
  hoverPoi: null,
  hoverType: null,
  hoverDistrict: null,
  currentCity: null,
  currentPoi: null,
  currentCategory: null,
  mapLocked: false,
  isDragged: false,
  isMainPage: false,
  isDetailPage: false
};

type Reducer = (state: StoreState, action: Action) => StoreState;

export const storeReducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DISTRICT_HOVER': {
      return { ...state, hoverDistrict: action.payload };
    }
    case 'SET_POI_HOVER': {
      return { ...state, hoverPoi: action.payload };
    }
    case 'SET_POI_TYPE': {
      return { ...state, hoverType: action.payload };
    }
    case 'SET_MAP_LOCK': {
      return { ...state, mapLocked: action.payload };
    }
    case 'SET_MAP_DRAG': {
      return { ...state, isDragged: action.payload };
    }
    case 'RESET_STATE': {
      return { ...initialState };
    }
    case 'SET_PAGE_STATE':
    case 'SET_CURRENT_PARAM': {
      return { ...state, ...action.payload };
    }
    default: {
      throw state;
    }
  }
};
