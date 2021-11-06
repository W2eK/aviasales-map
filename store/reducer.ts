import { Action } from './actions';
import { PoiType } from 'interfaces/city.interface';

export type StoreState = {
  districtHover: number | null;
  poiHover: number | null;
  poiType: PoiType | null;
};

export const initialState: StoreState = {
  districtHover: null,
  poiHover: null,
  poiType: null
};

type Reducer = (draft: StoreState, action: Action) => void;

export const storeReducer: Reducer = (draft, action) => {
  switch (action.type) {
    case 'SET_DISTRICT_HOVER': {
      draft.districtHover = action.payload;
      break;
    }
    case 'SET_POI_HOVER': {
      draft.poiHover = action.payload;
      break;
    }
    case 'SET_POI_TYPE': {
      draft.poiType = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
