"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Dribbble,
  Github,
  Linkedin,
  Send,
} from "lucide-react";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={
        "mt-16 border-t-2 pt-10 md:px-3 px-4 pb-6 gap-6 flex flex-col border-black bg-black text-white " + className
      }
    >
      <div className="max-w-6xl w-full mx-auto grid gap-4 md:gap-10 md:grid-cols-2">
        <div className="flex flex-col justify-start">
          <div className="text-4xl text-center md:text-start whitespace-nowrap md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
            You have a project?
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="rounded-full justify-center w-full md:w-fit border-2 border-white bg-white text-black hover:bg-black hover:text-white md:px-6 py-2 md:py-3 inline-flex items-center gap-2 text-base"
            >
              <span>Let&apos;s do stuff</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="flex h-full pt-3 justify-evenly flex-col gap-6">
          <form
            className="flex gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="pl-4 py-2 flex-grow rounded-full bg-transparent border-2 border-white placeholder-white/60 text-white"
            />
            <button
              type="button"
              className="rounded-full justify-center border-2 border-white  p-3 md:px-4 md:py-2 inline-flex items-center md:gap-2"
            >
              <Send size={16} />
              <span className="hidden md:block">Subscribe</span>
            </button>
          </form>
          <div className="flex items-center h-full gap-4">
            <div className="flex flex-grow md:items-start gap-2 md:justify-start col-span-2 md:flex-row flex-col items-center md:gap-2 md:pl-2">
              <Link href="/" className=" hover:underline uppercase">
                Home
              </Link>
              <Link href="/about" className="hover:underline uppercase">
                About
              </Link>
              <Link href="/work" className="hover:underline uppercase">
                Work
              </Link>
            </div>
            <div className="grid p-0 md:p-6 grid-cols-2 lg:p-0  md:flex items-center gap-4">
              <Link
                href="#"
                aria-label="Instagram"
                className="flex  p-3 justify-center items-center  aspect-square rounded-full border-2 border-white"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="#"
                aria-label="Dribbble"
                className="flex  p-3 justify-center items-center  aspect-square rounded-full border-2 border-white"
              >
                <Dribbble size={16} />
              </Link>
              <Link
                href="#"
                aria-label="Github"
                className="flex  p-3 justify-center items-center  aspect-square rounded-full border-2 border-white"
              >
                <Github size={16} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex  p-3 justify-center items-center  aspect-square rounded-full border-2 border-white"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-xs opacity-70">
          © {new Date().getFullYear()} Aymen Doin Stuff. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
