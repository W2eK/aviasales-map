import { Place, WidgetPlaces } from 'interfaces/places.interface';

export const shapePlaces = (widget: WidgetPlaces): Place[] => {
  const places = widget.data.widgets.trapV1.places;
  const shaped = places.map(({ iatas, ...rest }) => ({
    ...rest,
    iata: iatas[0]
  }));
  return shaped;
};
