import { PageProps } from 'interfaces/props.interface';
import { CategoryType, PoiType } from 'interfaces/data.interface';
import { IATA } from 'interfaces/iata.interface';
import { PageState } from './state';

type SetCurrentParam = {
  type: 'SET_CURRENT_PARAM';
  payload:
    | { currentPoi: number | null }
    | { currentCategory: CategoryType | null }
    | { currentCity: IATA | null };
};

export type Action =
  | {
      type: 'SET_DISTRICT_HOVER';
      payload: number | null;
    }
  | {
      type: 'SET_POI_HOVER';
      payload: number | null;
    }
  | {
      type: 'SET_POI_TYPE';
      payload: PoiType | null;
    }
  | {
      type: 'SET_MAP_LOCK';
      payload: boolean;
    }
  | {
      type: 'SET_MAP_DRAG';
      payload: boolean;
    }
  | {
      type: 'RESET_STATE';
    }
  | {
      type: 'RESET_PAGE_PROPS';
      payload: PageProps;
    }
  | {
      type: 'SET_INDEX';
      payload: number;
    }
  | {
      type: 'SET_PAGE_STATE';
      payload: PageProps;
    }
  | {
      type: 'SET_SLIDER_HEIGHT';
      payload: number;
    }
  | SetCurrentParam;

export const setDistrictHover = (id: number | null): Action => ({
  type: 'SET_DISTRICT_HOVER',
  payload: id
});

export const setPoiHover = (id: number | null): Action => ({
  type: 'SET_POI_HOVER',
  payload: id
});

export const setPoiType = (id: PoiType | null): Action => ({
  type: 'SET_POI_TYPE',
  payload: id
});

export const setMapLock = (state: boolean): Action => ({
  type: 'SET_MAP_LOCK',
  payload: state
});

export const setMapDrag = (state: boolean): Action => ({
  type: 'SET_MAP_DRAG',
  payload: state
});

export const resetState = (): Action => ({ type: 'RESET_STATE' });

export const resetPageProps = (payload: PageProps): Action => ({
  type: 'RESET_PAGE_PROPS',
  payload
});

export const setCurrentParam = <T extends SetCurrentParam['payload']>(
  payload: T
): SetCurrentParam => ({
  type: 'SET_CURRENT_PARAM',
  payload
});

export const setPageState = (payload: PageProps): Action => ({
  type: 'SET_PAGE_STATE',
  payload
});

export const setIndex = (payload: number): Action => ({
  type: 'SET_INDEX',
  payload
});

export const setSliderHeight = (payload: number): Action => ({
  type: 'SET_SLIDER_HEIGHT',
  payload
});
