interface Link {
  src: string;
  alt: string;
}

export interface News {
  display: boolean;
  titre_1: string;
  titre_2: string;
  article: string[];
  poster: Link;
  pdf?: Link[];
  readmore?: {
    alt: string;
    width: string;
    slide: string[];
  };
}
