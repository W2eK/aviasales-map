export interface Place {
  country: null | string;
  iata: string;
  isPremium: null;
  name: string;
}
export interface PlaceRaw {
  country: null | string;
  iatas: string[];
  isPremium: null;
  name: string;
}

export interface WidgetPlaces {
  data: {
    widgets: {
      trapV1: {
        places: PlaceRaw[];
      };
    };
  };
}

export interface Place extends Omit<PlaceRaw, 'iatas' | 'isPremium'> {
  iata: string;
}
