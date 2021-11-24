import { lineString, transformRotate } from '@turf/turf';
import { CategoryPageProps } from 'interfaces/props.interface';
import { LngLatBoundsLike, Map, PaddingOptions } from 'mapbox-gl';
import { MapCamera } from './map-camera';

export class CategoryCamera extends MapCamera {
  private stop = false;
  public page: 'category' = 'category';
  protected padding: PaddingOptions = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 340
  };
  constructor(
    protected map: Map,
    protected pageProps: CategoryPageProps,
    padding: number
  ) {
    super(map, pageProps);
    this.padding.bottom = (padding || 300) + 40;
    this.camera.zoom = 13;
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

  private getDistrict(id: number) {
    const district = this.pageProps.geojson.districts.features.find(
      ({ properties }) => properties.district_id === id
    )!;
    return district;
  }

  flyToDistrict(id: number) {
    const district = this.getDistrict(id);
    const bbox = MapCamera.getBbox(district, this.camera.center);
    this.animateBounds(bbox);
  }

  zoomToDistrict(id: number) {
    const district = this.getDistrict(id);
    const bbox = MapCamera.getBbox(district);
    super.animateBounds(bbox, {
      bearing: this.getBearing(20)
    });
  }

  flyToTarget(id: number) {
    const center = this.pageProps.poi[id].camera.center;
    const line = lineString([center, this.camera.center]);
    const pivoted = transformRotate(line, 180, { pivot: center });
    const bbox = MapCamera.getBbox(line, pivoted);
    this.animateBounds(bbox);
  }
  zoomToTarget(id: number) {
    const center = this.pageProps.poi[id].camera.center;
    const zoom = 15;
    const bearing = this.getBearing(20);
    this.animateFly({ center, zoom, bearing });
  }

  private rotateCamera(timestamp: number) {
    if (this.stop) return;
    const bearing = this.map.getBearing() + 0.1;
    this.map.rotateTo(bearing, { duration: 0 });
    requestAnimationFrame(this.rotateCamera.bind(this));
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
