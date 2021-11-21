import { Action } from './actions';
import { reducePageState } from './reducers/reducePageState';
import { initialState, StoreState } from './state';

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
    case 'SET_CURRENT_PARAM': {
      return { ...state, ...action.payload };
    }
    case 'SET_INDEX': {
      return { ...state, index: action.payload };
    }
    case 'SET_PAGE_STATE': {
      return reducePageState(state, action.payload);
    }
    default: {
      throw state;
    }
  }
};
