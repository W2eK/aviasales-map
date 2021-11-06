import { PoiType } from 'interfaces/city.interface';

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
    };

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
