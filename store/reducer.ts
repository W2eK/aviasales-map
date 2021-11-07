import { Action } from './actions';
import { PoiType } from 'interfaces/city.interface';

export type StoreState = {
  mapLocked: boolean;
  districtHover: number | null;
  poiHover: number | null;
  poiType: PoiType | null;
};

export const initialState: StoreState = {
  mapLocked: false,
  districtHover: null,
  poiHover: null,
  poiType: null
};

type Reducer = (state: StoreState, action: Action) => StoreState;

export const storeReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DISTRICT_HOVER': {
      return { ...state, districtHover: action.payload };
    }
    case 'SET_POI_HOVER': {
      return { ...state, poiHover: action.payload };
    }
    case 'SET_POI_TYPE': {
      return { ...state, poiType: action.payload };
    }
    case 'SET_MAP_LOCK': {
      return { ...state, mapLocked: action.payload };
    }
    default: {
      throw state;
    }
  }
};
