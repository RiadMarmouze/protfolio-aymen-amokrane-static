"use client";

import { Testimonial } from "@/lib/types/home";
import Image from "next/image";
import TestimonialCard from "../../_components/TestimonialCard/TestimonialCard";

export default function TestimonialSectionClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="flex flex-row w-fit gap-5 py-5 lg:grid lg:grid-cols-4 lg:gap-10 max-sm:animate-scrollRight">
      {testimonials.map((testimonialData) => (
        <div
          key={testimonialData.id}
          className="w-[calc(100vw-40px)] h-full lg:w-full flex-shrink-0"
        >
          <TestimonialCard
            key={testimonialData.id}
            testimonialData={testimonialData}
          />
        </div>
      ))}
    </div>
  );
}
