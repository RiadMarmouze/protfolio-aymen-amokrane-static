import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/public/layout/Container";
import AchievementsClient from "./Achievements.client";
import { ACHIEVEMENTS } from "@/lib/data/achievements";

export default async function AchievementsServer() {
  return (
    <section>
      <Container >
        <SectionTitle>Achievements</SectionTitle>
        <AchievementsClient items={ACHIEVEMENTS} />
      </Container>
    </section>
  );
}
