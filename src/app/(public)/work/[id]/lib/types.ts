export type CarouselItem = Readonly<{
  url: string;
  alt?: string;
  caption?: string;
  link?: string;
  width: number;
  height: number;
  displayRatio?: string; // e.g. "16:9"
}>;

export type Mode = "auto" | "clickAuto";
export type Transition = "linear" | "ease" | "ease-in-out";
export type Direction = "rtl" | "ltr";


export type RowType = "WIDE" | "TWO_UP" | "FEATURE";

