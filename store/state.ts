import { CategoryType, PoiType } from 'interfaces/data.interface';
import { IATA } from 'interfaces/iata.interface';
import {
  CategoryPageProps,
  CityPageProps,
  PoiPageProps
} from 'interfaces/props.interface';
import { HomePageProps } from 'pages';

export type StoreState = InternalState & PageState;

export type InternalState = {
  index: number;
  hoverPoi: number | null;
  hoverType: PoiType | null;
  hoverDistrict: number | null;
  currentCity: IATA | null;
  currentCategory: CategoryType | null;
  currentPoi: number | null;
  mapLocked: boolean;
  isDragged: boolean;
  sliderHeight: number;
};

export type PageState = HomePageState | CityPageState | DetailsPageState;

type HomePageState = {
  isMainPage: false;
  isDetailPage: false;
  pageProps: HomePageProps | {};
};

export type MainPageState = CityPageState | DetailsPageState;

type CityPageState = {
  isMainPage: true;
  isDetailPage: false;
  pageProps: CityPageProps;
};

export type DetailsPageState = {
  isMainPage: true;
  isDetailPage: true;
  pageProps: CategoryPageProps | PoiPageProps;
};

export const initialState: StoreState = {
  index: -1,
  hoverPoi: null,
  hoverType: null,
  hoverDistrict: null,
  currentCity: null,
  currentPoi: null,
  currentCategory: null,
  mapLocked: false,
  isDragged: false,
  isMainPage: false,
  isDetailPage: false,
  pageProps: {},
  sliderHeight: 0
};
