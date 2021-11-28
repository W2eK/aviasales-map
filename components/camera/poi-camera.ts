import { PoiPageProps } from 'interfaces/props.interface';
import { Map, PaddingOptions } from 'mapbox-gl';
import { MapCamera } from './map-camera';

export class PoiCamera extends MapCamera {
  public page: 'poi' = 'poi';
  protected padding: PaddingOptions = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 300
  };
  constructor(protected map: Map, protected pageProps: PoiPageProps) {
    super(map, pageProps);
  }
  jumpToInitial() {
    const center = this.pageProps.camera.center;
    this.map.jumpTo({ center, zoom: 12 });
    return this.delayedFly(this.flyToTarget.bind(this));
  }
  flyToTarget() {
    if (this.locked) return;
    const id = this.pageProps.currentPoi;
    super.flyToTarget(id);
  }
}
