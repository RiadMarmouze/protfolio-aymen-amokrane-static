export type MediaItem = {
  type: "image" | "video";
  url: string;
  alt?: string;
  // one of these is enough
  dimensions?: { w: number; h: number }; // e.g. { w: 700, h: 700 }
  aspect?: "square" | "wide";             // override/infer fallback
  span2?: boolean;                        // square that should take the whole row
};


export type SocialLink = {
  label: "Instagram" | "Behance" | "Linkedin";
  href: string;
};



export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number;
};