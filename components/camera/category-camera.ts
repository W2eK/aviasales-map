import {
  bbox as getBbox,
  featureCollection,
  point,
  lineString,
  transformRotate
} from '@turf/turf';
import { CategoryPageProps } from 'interfaces/props.interface';
import {
  CameraForBoundsOptions,
  LngLatBoundsLike,
  Map,
  PaddingOptions
} from 'mapbox-gl';
import { MapCamera } from './map-camera';

export class CategoryCamera extends MapCamera {
  protected padding: PaddingOptions = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 400
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
    let top, left, bottom, right;
    top = left = bottom = right = 64;
    this.animateBounds(this.pageProps.bounds);
  }

  flyToDistrict(id: number) {
    const district = this.pageProps.geojson.districts.features.find(
      ({ properties }) => properties.district_id === id
    )!;
    const bbox = MapCamera.getBbox(district, this.camera.center);
    this.animateBounds(bbox);
  }

  flyToTarget(id: number) {
    const center = this.pageProps.poi[id].camera.center;
    const line = lineString([center, this.camera.center]);
    const pivoted = transformRotate(line, 180, { pivot: center });
    const bbox = MapCamera.getBbox(line, pivoted);
    this.animateBounds(bbox);
  }
  protected animateBounds(bbox: LngLatBoundsLike) {
    let top, left, bottom, right;
    top = left = bottom = right = 64;
    super.animateBounds(bbox, {
      padding: { top, left, bottom, right },
      bearing: this.camera.bearing,
      maxZoom: this.camera.zoom
    });
  }
}
