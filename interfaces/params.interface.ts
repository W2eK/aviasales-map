import { CityParams } from 'pages/[city]';
import { CategoryParams } from 'pages/[city]/[category]';
import { PoiParams } from 'pages/[city]/[category]/[poi]';

export type MainPageParams = CityParams | CategoryParams | PoiParams;
export type AllPageParams = {} | MainPageParams;
