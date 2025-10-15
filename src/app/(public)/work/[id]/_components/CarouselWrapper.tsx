import { CarouselItem, Direction, Mode, Transition } from "../lib/types";
import { CarouselClient } from "./CarouselClient";

export function CarouselWrapper(props: {
  items: ReadonlyArray<CarouselItem>;
  mode?: Mode;
  intervalMs?: number;
  /** new: how fast each slide moves */
  slideDurationMs?: number;
  transition?: Transition;
  /** new: slide direction in auto mode */
  direction?: Direction;
  loop?: boolean;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  /** new: lucide icon size */
  arrowSize?: number;
  displayRatio?: string;
}) {
  return <CarouselClient {...props} />;
}
