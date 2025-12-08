import SectionTitle from "@/components/SectionTitle";
import CountUp from "@/components/public/about/CountUp";
import Container from "@/components/public/layout/Container";
import { stats_home } from "@/lib/data/about";
const bigNumber =
  "text-6xl md:text-7xl font-extrabold leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70";

export default function NumbersSectionServer() {
  return (
    <section className=" overflow-clip relative">
      <Container>
        <SectionTitle>By the numbers</SectionTitle>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats_home.map((s, i) => (
            <div key={i} className="select-none">
              <div className={bigNumber}>
                <CountUp value={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-lg font-semibold">{s.k}</div>
              {s.sub && <div className="text-sm opacity-70">{s.sub}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
