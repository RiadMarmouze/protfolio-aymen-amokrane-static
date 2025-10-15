"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { SECTIONS } from "@/lib/data/common";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false); // visible when scrolling down
  const lastY = useRef(0);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Track scroll direction: show on down, hide on up
  useEffect(() => {
    // start hidden; first downward scroll reveals it
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      // tiny movements: ignore to reduce jitter
      if (Math.abs(diff) < 4) return;

      if (open) {
        // keep nav visible if mobile menu is open
        setShow(true);
      } else if (diff > 0) {
        // scrolling down -> show
        setShow(true);
      } else {
        // scrolling up -> hide
        setShow(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Keep a CSS var with the current nav height (for layout usage elsewhere)
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
  }, [show, open]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b-2 border-black"
      initial={{ y: -60, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <div
        ref={barRef}
        className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      >
        <span className="mr-3 inline-flex items-center justify-center h-14 w-14">
          <Image
            src={"/images/common/logo.jpg"}
            alt={"logo"}
            width={884}
            height={343}
            priority={false}
            className="object-contain w-full h-full opacity-90"
          />
        </span>

        <nav className="hidden md:flex items-center gap-6">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={s === "home" ? "/" : `/${s}`}
              className="uppercase tracking-[0.2em] text-[16px] hover:underline"
            >
              {s.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full border-2 text-white hover:text-black bg-black hover:bg-white border-black px-5 py-2 text-sm md:text-base inline-flex items-center gap-2"
            aria-label="Go to Contact"
          >
            <span className="font-medium">Let&apos;s do stuff</span>
            <ArrowUpRight size={16} />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border-2 px-2 py-2"
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
          className="md:hidden border-b-2 border-black bg-white"
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
