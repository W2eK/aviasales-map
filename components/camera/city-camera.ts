import { CityPageProps } from 'interfaces/props.interface';
import { Map, PaddingOptions } from 'mapbox-gl';
import { MapCamera } from './map-camera';

export class CityCamera extends MapCamera {
  public page: 'city' = 'city';
  protected padding: PaddingOptions = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 100
  };
  constructor(protected map: Map, protected pageProps: CityPageProps) {
    super(map, pageProps);
  }
  jumpToInitial() {
    const bounds = this.map.cameraForBounds(this.pageProps.bounds, {
      maxZoom: this.camera.zoom
    })!;
    this.map.jumpTo({ ...bounds, bearing: 0, pitch: 0 });
    return this.delayedFly(this.flyToInitial.bind(this));
  }
  flyToInitial() {
    this.animateFly();
  }
}
