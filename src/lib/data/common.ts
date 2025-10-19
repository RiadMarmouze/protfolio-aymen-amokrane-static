import { Behance, Instagram, Linkedin } from "@/components/public/common/icons";
import { IconProps, SocialLink } from "@/lib/types/common";
export const SECTIONS = ["home", "about", "work"] as const;

export const SOCIAL_ICON_MAP = {
  Behance,
  Instagram,
  Linkedin,
} as const satisfies Record<string, React.FC<IconProps>>;

export const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/aymen.doinstuff",
    label: "Instagram",
  },
  {
    href: "https://behance.net/aymenamok",
    label: "Behance",
  },
  {
    href: "https://www.linkedin.com/in/aymen-amokrane-72648a1a9/",
    label: "Linkedin",
  },
] as const satisfies ReadonlyArray<SocialLink>;


export const FOOTER_COPY = {
  headline: "You have a project?",
  ctaLabel: "Let's do stuff",
  contactHref: "/contact",
  owner: "Aymen Doin Stuff",
} as const;
