import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { Popup } from './popup';
import { Marker } from './marker';
import { motion } from 'framer-motion';
import { MarkerLink } from './link';

export const PoiMarker: FC = () => {
  let { state } = useStoreContext() as MainPageContext;
  const poi =
    state.hoverPoi !== null ? state.pageProps.poi[state.hoverPoi] : null;
    
  return useMemo(() => {
    return (
      <Marker
        coordinates={poi && poi.camera.center}
        offset={[0, -60]}
        anchor="bottom"
      >
        <MarkerLink category="all" poi={poi && poi.id}>
          {poi && (
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0, originY: '100%' }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0 }}
            >
              <Popup poi={poi} />
            </motion.div>
          )}
        </MarkerLink>
      </Marker>
    );
  }, [poi]);
};
