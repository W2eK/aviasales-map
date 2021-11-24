import { DistrictRootBlock, PoiProps } from 'interfaces/poi.interface';

export const shapeDistrict = ({ district }: DistrictRootBlock): PoiProps => {
  const { description, title, image } = district;
  return {
    description,
    title,
    image: image.image_url
  };
};
