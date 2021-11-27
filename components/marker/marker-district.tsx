import { FC, useMemo, useState } from 'react';
import { Listener, useMap } from 'mapboxr-gl';
import { MainPageContext, useStoreContext } from 'store/context';
import { DistrictLabel } from './styled';
import { Position } from 'interfaces/geodata.interface';
import { getIntersection } from './utils';
import { motion } from 'framer-motion';
import { LngLat } from 'mapbox-gl';
import { Marker } from './marker';
import { MarkerLink } from './link';

export const DistrictMarker: FC = () => {
  const { map } = useMap();
  const { state } = useStoreContext() as MainPageContext;
  const [forceUpdate, setForceUpdate] = useState(0);
  const district =
    state.hoverDistrict !== null
      ? state.pageProps.poi[state.hoverDistrict]
      : null;
  return useMemo(() => {
    let position: Position | null = null;
    let offset = { x: 0, y: 0 };
    if (district) {
      const polygon = state.pageProps.geojson.districts.features.find(
        ({ properties }) => properties.district_id === district.id
      )!;
      position = getIntersection(map, polygon);
      const center = map.project(map.getCenter());
      const destination = district && map.project(new LngLat(...position));
      offset = center.sub(destination);
      offset.y -= 20;
    }
    return (
      <>
        <Listener
          type="on"
          event="rotate"
          handler={() => district && setForceUpdate(i => ++i)}
        />
        <Marker offset={[0, 20]} anchor="center" coordinates={position}>
          <MarkerLink category="districts" poi={district && district.id}>
            {district && (
              <motion.div
                initial={{ ...offset, opacity: 0, scale: 0 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <DistrictLabel>{district.name}</DistrictLabel>
              </motion.div>
            )}
          </MarkerLink>
        </Marker>
      </>
    );
  }, [district, forceUpdate]);
};
