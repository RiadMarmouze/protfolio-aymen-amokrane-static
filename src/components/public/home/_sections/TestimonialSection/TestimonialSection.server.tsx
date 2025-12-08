import { TESTIMONIAL_DATA } from "@/lib/data/home";
import TestimonialSectionClient from "./TestimonialSection.client";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/public/layout/Container";

export default function TestimonialSectionServer() {
  return (
    <section className=" overflow-clip relative">
      <Container>
        <SectionTitle>Testimonial</SectionTitle>
        <TestimonialSectionClient testimonials={TESTIMONIAL_DATA} />
      </Container>
    </section>
  );
}
