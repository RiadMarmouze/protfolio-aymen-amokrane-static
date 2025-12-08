export type BrandLogo = {
  name: string;
  src: string; // path or remote URL
  width: number; // intrinsic width for next/image
  height: number; // intrinsic height for next/image
};

export interface Testimonial {
  id: number;
  content: string;
  imageUrl: string;
  name: string;
  role: string;
}


export type ImageItem = { src: string; alt: string; word?: string };

export type FeaturedRef = { id: string; ratio: string; order?: number };
