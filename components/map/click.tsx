import { FC, ReactNode, useCallback, useMemo } from 'react';
import { Listener, MapHandlers, LayerHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { useRouter } from 'next/router';
import { PoiParams } from 'pages/[city]/[category]/[poi]';
import { setDistrictHover, setPoiHover, setPoiType } from 'store/actions';
import { PoiGeojson } from 'interfaces/geodata.interface';

type ClickProps = {
  handler: MapHandlers['click'] | LayerHandlers['click'];
  layer?: string;
};

const ClickHandler: FC<ClickProps> = ({ handler, layer }) => {
  const clickHandler: MapHandlers['click'] = event => {
    if (!event.defaultPrevented) handler(event);
    event.preventDefault();
  };
  return (
    <Listener type="on" event="click" handler={clickHandler} layer={layer} />
  );
};

export const ClickHandlers: FC = () => {
  const { dispatch } = useStoreContext();
  const router = useRouter();

  const mapClickHandler: MapHandlers['click'] = useCallback(() => {
    const { city, category }: Partial<PoiParams> = router.query;
    if (city && category) router.push(`/${city}`);
  }, [dispatch, router]);

  const poiClickHandler: LayerHandlers['click'] = useCallback(event => {
    const features = event.features as PoiGeojson['features'] | undefined;
    if (features) {
      dispatch(setPoiHover(features[0].properties.id));
      dispatch(setPoiType(features[0].properties.type));
    }
  }, []);

  // prettier-ignore
  const districtClickHandler: LayerHandlers['click'] = useCallback(({ features }) => {
    if (features) {
      const id = features[0].id as number;
      dispatch(setDistrictHover(id));
      const { city }: Partial<PoiParams> = router.query;
      if (city) router.push(`/${city}/districts`);
    }
  }, []);

  return (
    <>
      <ClickHandler handler={districtClickHandler} layer="districts-labels-24" />
      <ClickHandler handler={districtClickHandler} layer="districts-labels-48" />
      <ClickHandler handler={poiClickHandler} layer="poi-inactive" />
      <ClickHandler handler={districtClickHandler} layer="districts-area" />
      <ClickHandler handler={mapClickHandler} />
    </>
  );
};
