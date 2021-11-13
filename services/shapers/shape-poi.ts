import {
  BlocksRoot,
  DescriptionBlock,
  ImageBlock,
  PoiProps,
  TitleBlock
} from 'interfaces/poi.interface';

export const shapePoi = ({ blocks }: BlocksRoot): PoiProps => {
  const description =
    blocks.find(
      (block): block is DescriptionBlock => block.type === 'description'
    )?.block.description || '';

  const title =
    blocks.find((block): block is TitleBlock => block.type === 'title')?.block
      .title || '';

  const image =
    blocks.find((block): block is ImageBlock => block.type === 'image_gallery')
      ?.block.images[0]?.image_url || '';

  return {
    description,
    title,
    image
  };
};
