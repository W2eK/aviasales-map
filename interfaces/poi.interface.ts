// Generated by https://quicktype.io

export type PoiProps = {
  description: string;
  title: string;
  image: string;
};

export type BlocksRoot = {
  blocks: PoiBlock[];
};

export type PoiBlock =
  | ImageBlock
  | TitleBlock
  | DescriptionBlock
  | InstagramBlock
  | ButtonsBlock
  | AdviceBlock;

export type ImageBlock = {
  type: 'image_gallery';
  block: {
    images: BlockImage[];
  };
};

export type BlockImage = {
  image_url: string;
  author_name: string;
  author_url: string;
};

export type TitleBlock = {
  type: 'title';
  block: {
    title: string;
  };
};

export type DescriptionBlock = {
  type: 'description';
  block: {
    description: string;
  };
};

export type InstagramBlock = {
  type: 'instagram_url';
  block: {
    instagram_url: string;
  };
};

export type ButtonsBlock = {
  type: 'buttons';
  block: {
    buttons: BlockButton[];
  };
};

export type BlockButton = {
  type: 'instagram';
  title: string;
  url: string;
};

export type AdviceBlock = {
  type: 'advice';
  block: {
    title: string;
    text: string;
  };
};

// Generated by https://quicktype.io

export interface DistrictRootBlock {
  district: DistrictBlock;
}

export interface DistrictBlock {
  title: string;
  description: string;
  image: BlockImage;
  images: BlockImage[];
  tags: string[];
}
