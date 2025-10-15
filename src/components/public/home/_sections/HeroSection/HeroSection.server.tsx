import Placeholder from "@/components/public/common/Placeholder";
import { getBaseUrl } from "@/lib/getBaseUrl";
import HeroSectionClient from "./HeroSection.client";

export const revalidate = 60;

// include `word` so the client can take the words from image data
type HeroImage = { src: string; alt: string; word?: string };

async function getHeroImages(limit = 5): Promise<HeroImage[]> {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/public/home/hero/images?limit=${limit}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { items: HeroImage[] };
  return data.items ?? [];
}

export default async function HeroSectionServer() {
  const images = await getHeroImages(5);

  return (
    <section className="relative h-screen  overflow-hidden ">
      {/* One client component controls: background carousel + text + CTA */}
      {images?.length ? (
        <HeroSectionClient images={images} />
      ) : (
        <Placeholder className="w-full h-full absolute inset-0 -z-10" />
      )}

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(#000_1px,transparent_1px)] bg-[length:100%_6px]" />
    </section>
  );
}
