import { Action } from './actions';
import { PoiType } from 'interfaces/data.interface';

export type StoreState = {
  mapLocked: boolean;
  districtHover: number | null;
  poiHover: number | null;
  poiType: PoiType | null;
  selectedType: PoiType | null;
  selectedIds: number[] | null;
  isDragged: boolean;
};

export const initialState: StoreState = {
  mapLocked: false,
  isDragged: false,
  districtHover: null,
  selectedIds: null,
  selectedType: null,
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
    case 'SET_MAP_DRAG': {
      return { ...state, isDragged: action.payload };
    }
    case 'RESET_STATE': {
      return { ...initialState };
    }
    default: {
      throw state;
    }
  }
};
