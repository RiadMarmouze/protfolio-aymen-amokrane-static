import Link from "next/link";
import * as React from "react";
import { ArrowUpRight, Send } from "@/components/public/common/icons";
import {
  SECTIONS,
  SOCIAL_LINKS,
  FOOTER_COPY,
  SOCIAL_ICON_MAP,
} from "@/lib/data/common";
import { cn } from "@/lib/utils/cn";
import { subscribe } from "@/app/actions/subscribe.client";
import { isExternal } from "@/lib/utils/helpers";

// ------------------------------
// Types
// ------------------------------

type Props = { className?: string };


// ------------------------------
// Subcomponents
// ------------------------------

function SectionLinks() {
  return (
    <nav
      aria-label="Footer Navigation"
      className="flex flex-grow flex-col items-center gap-2 md:flex-row md:items-start md:justify-start md:gap-2 md:pl-2"
    >
      {SECTIONS.map((section) => {
        const href = section === "home" ? "/" : `/${section}`;
        return (
          <Link key={section} href={href} className="uppercase hover:underline">
            {section}
          </Link>
        );
      })}
    </nav>
  );
}

function SocialLinks() {
  return (
    <ul className="grid grid-cols-2 items-center gap-4  md:flex ">
      {SOCIAL_LINKS.map(({ href, label }) => {
        const Icon = SOCIAL_ICON_MAP[label];
        const externalProps = isExternal(href)
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {};

        return (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              className="flex aspect-square items-center justify-center rounded-full border-2 border-white p-3 transition hover:bg-white hover:text-black"
              {...externalProps}
            >
              {Icon ? (
                <Icon aria-hidden size={16} className="h-4 w-4" />
              ) : (
                <span className="sr-only">{label}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SubscribeForm() {
  return (
    <form className="flex w-full" action={subscribe}>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@email.com"
        className={cn(
          "flex-grow rounded-full border-2 border-white bg-transparent pl-4 py-2",
          "text-white placeholder-white/60",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        )}
      />
      <button
        type="submit"
        className={cn(
          "inline-flex items-center justify-center ml-4 gap-2 rounded-full border-2 border-white p-3 md:px-4 md:py-2",
          "transition hover:bg-white hover:text-black",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        )}
        aria-label="Subscribe"
      >
        <Send aria-hidden size={16} className="h-4 w-4" strokeWidth={2} />
        <span className="hidden md:block">Subscribe</span>
      </button>
    </form>
  );
}

// ------------------------------
// Main Component
// ------------------------------

export default function Footer({ className }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-16 flex flex-col gap-6 border-t-2 border-black bg-black px-4 pt-10 pb-6 text-white md:px-3",
        className
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 md:gap-0">
        {/* Left */}
        <div className="flex flex-col justify-start">
          <h2 className="whitespace-nowrap text-center text-4xl leading-[0.95] tracking-tight md:text-start md:text-5xl lg:text-6xl">
            {FOOTER_COPY.headline}
          </h2>
          <div className="mt-6">
            <Link
              href={FOOTER_COPY.contactHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white py-2 text-base text-black transition md:w-fit md:px-6 md:py-3",
                "hover:bg-black hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              )}
            >
              <span>{FOOTER_COPY.ctaLabel}</span>
              <ArrowUpRight aria-hidden size={16} className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex h-full justify-center gap-4 flex-col  ">
          <SubscribeForm />
          <div className="flex  items-center gap-4">
            <SectionLinks />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-center">
        <p className="text-xs opacity-70">© {year} {FOOTER_COPY.owner}. All rights reserved.</p>
      </div>
    </footer>
  );
}
