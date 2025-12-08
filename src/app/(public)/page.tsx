/* eslint-disable @typescript-eslint/no-explicit-any */
// import EdgeLabel from "@/components/EdgeLabel";
import HeroSectionServer from "@/components/public/home/_sections/HeroSection/HeroSection.server";
import FeaturedProjectsServer from "@/components/public/home/_sections/FeaturedProjectsSection/FeaturedProjects.server";
import SelectedClientsServer from "@/components/public/home/_sections/SelectedClientsSection/SelectedClients.server";

import PageIntroTransition from "@/components/public/home/PageIntroTransition";
import { ReactNode, Suspense } from "react";
import NumbersSectionServer from "@/components/public/home/_sections/NumbersSection/Numbers.server";
import TestimonialSectionServer from "@/components/public/home/_sections/TestimonialSection/TestimonialSection.server";
const INTRO_CONFIG = {
  bgColor: "#000",
  rectColor: "#fff",
  rectSize: { w: 300, h: 100 },
  borderRadius: 0,
  imageUrl: "/images/common/logo.jpg",
  imageFit: "cover" as const,
  imagePosition: "50% 45%",
  durationMs: 2100,
  bgFadeStartAtMs: 1800,
  bgFadeDurationMs: 500,
  overlayHideAtMs: 1200,
  shakeIntensity: 4,
  sweep: {
    enabled: true,
    color: "rgba(0,0,0,0.5)",
    angleDeg: 135,
    widthPct: 18,
  },
  glow: {
    enabled: true,
    color: "#ffffff",
    blurPx: 5,
    spreadPx: 2,
    opacity: 0.3,
  },
  disableTint: true,
  tintOpacity: 0.35,
};

function SectionSkeleton({ label }: { label: ReactNode }) {
  return (
    <section
      aria-label={typeof label === "string" ? label : undefined}
      className="relative"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="h-8 w-56 rounded bg-black/10" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-black/5" />
          <div className="aspect-video rounded-xl bg-black/5" />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageIntroTransition config={INTRO_CONFIG}>
      {/* <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a> */}

      <main
        id="content"
        className="relative  w-screen flex flex-col gap-10 md:gap-16 min-h-screen"
      >
        {/* Decorative edge hint; hidden from AT */}
        {/* <EdgeLabel aria-hidden>Scroll v</EdgeLabel> */}

        {/* HERO */}
        <Suspense fallback={<SectionSkeleton label="Hero" />}>
          <HeroSectionServer />
        </Suspense>

        {/* FEATURED PROJECTS */}
        <Suspense fallback={<SectionSkeleton label="Featured projects" />}>
          <FeaturedProjectsServer />
        </Suspense>

        {/* CLIENTS (full-bleed marquee) */}
        {/* <Suspense fallback={<SectionSkeleton label="Selected clients" />}>
          <SelectedClientsServer />
        </Suspense> */}

        {/* NUMBERS (full-bleed marquee) */}
        <Suspense fallback={<SectionSkeleton label="Selected clients" />}>
          <NumbersSectionServer />
        </Suspense>

        <Suspense fallback={<SectionSkeleton label="Testimonials" />}>
          <TestimonialSectionServer />
        </Suspense>
      </main>
    </PageIntroTransition>
  );
}
