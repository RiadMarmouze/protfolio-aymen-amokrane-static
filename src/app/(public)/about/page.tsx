import SectionTitle from "@/components/SectionTitle";
import CountUp from "@/components/public/about/CountUp";
import Image from "next/image";

import { experiences, education, skills, tools, stats } from "@/data/about";
import { ACHIEVEMENTS } from "@/lib/data/achievements";

/* ===== Local style tokens (kept in this file) ===== */
const container = "max-w-5xl mx-auto px-4";
const sectionSpacing = "py-10";
const titleStyle = "text-sm font-semibold uppercase tracking-[0.15em]";
const tagStyle = "border px-2 py-1 rounded-full text-xs";
const bigNumber =
  "text-6xl md:text-7xl font-extrabold leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70";
/* ================================================ */

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-[var(--nav-h)]">
      {/* Hero */}
      <section className="relative h-[42vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        {/* <div
          className="absolute inset-0 opacity-10 bg-repeat-x bg-center scale-105"
          style={{
            backgroundImage: "url('/images/common/profile-pattern.png')", // your pattern image
            backgroundSize: "auto 100%", // full height, repeat horizontally
          }}
        /> */}

        {/* Dark tint overlay */}
        {/* <div className="absolute inset-0 bg-black/10 mix-blend-multiply" /> */}
        <span className="absolute inset-0 magicpattern"/>

        {/* Foreground content */}
        <div className="relative z-10 text-black text-center">
          <div className="mx-auto h-28 w-28 rounded-full border-2 border-white overflow-hidden bg-white shadow relative">
            <Image
              src="/images/common/profile.jpg"
              alt="Profile picture"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-xl  font-medium">Aymen Amokrane</div>
          <div className="text-sm opacity-80">
            Senior Brand Designer — Dubai
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={`${container} ${sectionSpacing}`}>
        <p className="text-lg md:text-xl leading-relaxed font-medium text-center text-gray-800">
          Designer focused on{" "}
          <span className="font-semibold bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
            strategy-led brand systems
          </span>
          . I help teams ship identities that scale — from{" "}
          <span className="italic font-bold">positioning</span> to{" "}
          <span className="italic font-bold">guidelines</span> and{" "}
          <span className="italic font-bold">design ops</span>.
        </p>
      </section>

      {/* Experience */}
      <section className={`${container} pb-10`}>
        <SectionTitle>Experience</SectionTitle>
        <div className="divide-y divide-black/40">
          {experiences.map((e, i) => (
            <div key={i} className="py-4">
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-medium">
                  {e.role} — {e.company}
                </div>
                <div className="text-xs opacity-70">{e.period}</div>
              </div>
              <p className="text-sm opacity-80 mt-1">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education / Skills / Tools */}
      <section className={`${container} pb-10 grid md:grid-cols-3 gap-6`}>
        <div>
          <div className={titleStyle}>Education</div>
          <ul className="mt-3 space-y-2 text-sm">
            {education.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className={titleStyle}>Skills & Focus</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className={tagStyle}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className={titleStyle}>Tools</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tools.map((t) => (
              <span key={t} className={tagStyle}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} pb-10`}>
        <SectionTitle>Achievements</SectionTitle>
        <ul className="space-y-8  md:space-y-10">
          {ACHIEVEMENTS.map(({ title, subtitle }, i) => (
            <li key={`${title}-${i}`}>
              <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
              {subtitle && (
                <p className="text-neutral-500 md:text-neutral-600 text-sm md:text-base max-w-2xl">
                  {subtitle}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
      {/* Numbers */}
      <section>
        <div className={`${container} `}>
          <SectionTitle>By the numbers</SectionTitle>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s, i) => (
              <div key={i} className="select-none">
                <div className={bigNumber}>
                  <CountUp value={s.v} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-lg font-semibold">{s.k}</div>
                {s.sub && <div className="text-sm opacity-70">{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
