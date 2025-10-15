"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  words: readonly string[];
  /** If provided, component is controlled and ignores its own timer */
  activeIndex?: number;
  /** Only used in uncontrolled mode */
  interval?: number;
  className?: string;
};

export default function BigWordRotator({
  words,
  activeIndex,
  interval = 2400,
  className = "",
}: Props) {
  const controlled = typeof activeIndex === "number";
  const [i, setI] = useState(0);

  useEffect(() => {
    if (controlled) return; // parent drives the index
    const id = setInterval(
      () => setI((v) => (v + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [controlled, words.length, interval]);

  const current = controlled ? activeIndex! : i;

  return (
    <div
      className={
        "relative h-[1.35em] md:h-[1.25em] overflow-hidden leading-[1.1] " +
        className
      }
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: 44, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -44, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="inline-block"
        >
          {words[current]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
