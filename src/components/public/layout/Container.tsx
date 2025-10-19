import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Centers content and caps width so layout doesn't sprawl on zoom-out.
 * Adjust max-w as you prefer (e.g., 1200/1280/1440).
 */
export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
