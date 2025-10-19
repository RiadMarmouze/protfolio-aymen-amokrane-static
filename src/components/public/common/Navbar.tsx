"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { SECTIONS } from "@/lib/data/common";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastY = useRef(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const TOP_THRESHOLD = 12;
  const isMainRoute = (pathname ?? "/") === "/";

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      const nowAtTop = y <= TOP_THRESHOLD;
      setIsAtTop(nowAtTop);

      // Always show at the very top
      if (nowAtTop) {
        setShow(true);
      } else if (open) {
        // keep visible while mobile menu is open
        setShow(true);
      } else {
        // simplified rule:
        // down -> hide, up -> show
        setShow(diff < 0);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Keep --nav-h updated
  useEffect(() => {
    const update = () => {
      const h = barRef?.current
        ? barRef.current.getBoundingClientRect().height
        : 64;
      document.documentElement.style.setProperty("--nav-h", h + "px");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [show, open, isAtTop]);

  // Special design ONLY when at top on the main route
  const atTopMainRoute = isAtTop && isMainRoute;

  const headerBase =
    "fixed h-[var(--nav-h)] top-0 left-0 right-0 z-50 w-full transition-colors";
  const headerStyle = atTopMainRoute
    ? "bg-gradient-to-b from-black/70 via-black/40 to-transparent border-transparent"
    : "bg-white border-b-2 border-black";

  // Optional: tweak inner spacing/height/logo size at top on main
  const innerBase = "mx-auto max-w-6xl px-4 flex items-center justify-between";
  const innerStyle = atTopMainRoute ? "py-5" : "py-3";

  const linkBase = "uppercase tracking-[0.2em] hover:underline";
  const linkColor = atTopMainRoute ? "text-white" : "text-black";
  const ctaClasses = atTopMainRoute
    ? "rounded-full border-2 text-white hover:text-black bg-transparent hover:bg-white/90 border-white"
    : "rounded-full border-2 text-white hover:text-black bg-black hover:bg-white border-black";

  return (
    <motion.header
      className={`${headerBase} ${headerStyle}`}
      initial={{ y: -60, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      // prevent hidden header from blocking clicks
      style={{ pointerEvents: show || open ? "auto" : "none" }}
      aria-hidden={!show && !open}
    >
      <div
        ref={barRef}
        className={`${innerBase} ${innerStyle} relative flex items-center justify-between`}
      >
        {/* Left: Logo */}
        <span className="mr-3 inline-flex items-center justify-center h-14 w-14">
          <Image
            src={"/images/common/logo.jpg"}
            alt={"logo"}
            width={884}
            height={343}
            priority={false}
            className={`object-contain w-full h-full opacity-90 ${
              atTopMainRoute ? "mix-blend-normal" : ""
            }`}
          />
        </span>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={s === "home" ? "/" : `/${s}`}
              className={`${linkBase} ${linkColor} text-[16px]`}
            >
              {s.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`${ctaClasses} px-5 py-2 text-sm md:text-base inline-flex items-center gap-2`}
            aria-label="Go to Contact"
          >
            <span className="font-medium">Let&apos;s do stuff</span>
            <ArrowUpRight size={16} />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden rounded-full border-2 px-2 py-2 ${
              atTopMainRoute ? "border-white text-white" : ""
            }`}
            aria-label="Open Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className={`md:hidden border-b-2 bg-white overflow-hidden ${
            atTopMainRoute ? "border-white" : "border-black"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {SECTIONS.map((s) => (
              <Link
                key={s}
                href={s === "home" ? "/" : `/${s}`}
                onClick={() => setOpen(false)}
                className="text-left py-2 uppercase tracking-[0.2em] text-[12px] hover:underline"
              >
                {s.toUpperCase()}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
