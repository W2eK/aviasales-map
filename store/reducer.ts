import { Action } from './actions';
import { reducePageState } from './reducers/reducePageState';
import { initialState, StoreState } from './state';

type Reducer = (state: StoreState, action: Action) => StoreState;

export const storeReducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DISTRICT_HOVER': {
      if (
        state.isDetailPage &&
        state.currentCategory === 'districts' &&
        action.payload !== null
      ) {
        const index = state.pageProps.order.indexOf(action.payload);
        return { ...state, hoverDistrict: action.payload, index };
      }
      return { ...state, hoverDistrict: action.payload };
    }
    case 'SET_POI_HOVER': {
      if (state.isDetailPage) {
        const index = state.pageProps.order.indexOf(action.payload || -1);
        return { ...state, hoverPoi: action.payload, index };
      }
      return { ...state, hoverPoi: action.payload, index: -1 };
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
      if (!state.isDetailPage) {
        console.error(action.type);
        throw state;
      }
      const index = action.payload;
      const key =
        state.currentCategory === 'districts' ? 'hoverDistrict' : 'hoverPoi';
      const id = state.pageProps.order[index] || null;
      return { ...state, index, [key]: id };
    }
    case 'SET_PAGE_STATE': {
      return reducePageState(state, action.payload);
    }
    case 'SET_SLIDER_HEIGHT': {
      return { ...state, sliderHeight: action.payload };
    }
    default: {
      throw state;
    }
  }
};
