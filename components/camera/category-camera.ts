import { bbox as getBbox } from '@turf/turf';
import { CategoryPageProps } from 'interfaces/props.interface';
import { CameraForBoundsOptions, Map, PaddingOptions } from 'mapbox-gl';
import { MapCamera } from './map-camera';

export class CategoryCamera extends MapCamera {
  protected padding: PaddingOptions = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 300
  };
  constructor(protected map: Map, protected pageProps: CategoryPageProps) {
    super(map, pageProps);
  }
  // jumpToInitial = CityCamera.prototype.jumpToInitial.bind(this);
  jumpToInitial() {
    const bounds = this.map.cameraForBounds(this.pageProps.bounds, {
      maxZoom: this.camera.zoom
    })!;
    this.map.jumpTo({ ...bounds, bearing: 0, pitch: 0 });
    this.delayedFly(this.flyToInitial.bind(this));
  }
  flyToInitial() {
    this.animateBounds(this.pageProps.bounds, {
      padding: { top: 64, bottom: 64, left: 64, right: 64 }
    });
  }

  flyToDistrict(id: number) {
    const district = this.pageProps.geojson.districts.features.find(
      ({ properties }) => properties.district_id === id
    )!;
    const bbox = getBbox(district) as [number, number, number, number];
    const options: CameraForBoundsOptions = {
      padding: { top: 64, bottom: 100, left: 64, right: 64 },
      maxZoom: this.camera.zoom
    };
    this.animateBounds(bbox, options);
  }
}
