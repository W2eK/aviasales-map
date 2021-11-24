import { bbox, featureCollection, point } from '@turf/turf';
import { Camera } from 'interfaces/data.interface';
import {
  CategoryPageProps,
  CityPageProps,
  MainPageProps,
  PageType,
  PoiPageProps
} from 'interfaces/props.interface';
import {
  CameraForBoundsOptions,
  CameraForBoundsResult,
  FlyToOptions,
  LngLatBoundsLike,
  Map,
  PaddingOptions
} from 'mapbox-gl';

export class MapCamera {
  protected duration = 1000;
  protected initial = true;
  protected locked = false;
  protected camera;
  protected padding: PaddingOptions = { top: 0, bottom: 0, left: 0, right: 0 };
  constructor(map: Map, pageProps: CityPageProps);
  constructor(map: Map, pageProps: CategoryPageProps);
  constructor(map: Map, pageProps: PoiPageProps);
  constructor(protected map: Map, protected pageProps: MainPageProps) {
    this.camera = pageProps.camera;
  }
  flyToTarget(id: number) {
    const center = this.pageProps.poi[id].camera.center;
    this.animateFly({ center });
  }
  delayedFly(callback: (...args: any[]) => void) {
    this.locked = true;
    this.map.once('idle', () =>
      setTimeout(() => {
        this.locked = false;
        this.duration = 3000;
        callback();
        this.duration = 1000;
      }, 700)
    );
  }
  protected animateFly(camera: FlyToOptions = {}) {
    if (this.locked) return;
    const center = camera.center || this.camera.center;
    const distance = this.map
      .project(this.map.getCenter())
      .dist(this.map.project(center));
    const options = {
      ...this.camera,
      padding: this.padding,
      duration: this.duration,
      ...camera
    };

    const isZoomIn = this.map.getZoom() < options.zoom;
    if (distance > 400 || isZoomIn) {
      this.map.flyTo(options);
    } else {
      this.map.easeTo(options);
    }
  }
  protected animateBounds(
    bounds: LngLatBoundsLike,
    options?: CameraForBoundsOptions
  ) {
    const camera = this.map.cameraForBounds(bounds, options)!;
    this.animateFly(camera);
  }
  static getBbox(...features: (GeoJSON.Feature | [number, number])[]) {
    const collection = featureCollection(
      features.map(feature =>
        Array.isArray(feature) ? point(feature) : feature
      )
    );
    return bbox(collection) as [number, number, number, number];
  }
  protected getBearing(deg: number) {
    return this.map.getBearing() + (this.camera.bearing > 0 ? deg : -deg);
  }
}
