export function isExternal(href: string) {
  return href.startsWith("http");
}



/** Accepts "3:2" or falls back to width/height; returns "3 / 2" for CSS aspect-ratio */
export function toAspectRatio(
  displayRatio?: string,
  width?: number,
  height?: number
): string {
  if (displayRatio && displayRatio.includes(":")) {
    const [w, h] = displayRatio.split(":").map(Number);
    if (isFinite(w) && isFinite(h) && w > 0 && h > 0) return `${w} / ${h}`;
  }
  if (width && height && width > 0 && height > 0) {
    return `${width} / ${height}`;
  }
  // sane default
  return "16 / 9";
}
