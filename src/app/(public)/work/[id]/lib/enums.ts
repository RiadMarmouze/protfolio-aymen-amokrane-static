/** ============================================================================
 * ENUM CONSTANTS
 * ----------------------------------------------------------------------------
 * These are defined as readonly literal tuples (`as const`)
 * so they integrate seamlessly with both:
 *   • TypeScript literal unions
 *   • Zod’s z.enum()
 * ============================================================================
 */

// ─────────────────────────────────────────────
// Block Types
// ─────────────────────────────────────────────
export const BLOCK_TYPES = [
  "heading",
  "subheading",
  "paragraph",
  "quote",
  "image",
  "list",
  "inlineList",
  "imageGrid",
  "carousel",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

// ─────────────────────────────────────────────
// Carousel Modes
// ─────────────────────────────────────────────
export const CAROUSEL_MODES = ["auto", "clickAuto"] as const;
export type CarouselMode = (typeof CAROUSEL_MODES)[number];

// ─────────────────────────────────────────────
// Carousel Transitions
// ─────────────────────────────────────────────
export const CAROUSEL_TRANSITIONS = ["linear", "ease", "ease-in-out"] as const;
export type CarouselTransition = (typeof CAROUSEL_TRANSITIONS)[number];

// ─────────────────────────────────────────────
// Grid Columns
// ─────────────────────────────────────────────
export const GRID_COLUMNS = ["2", "3", "4"] as const;
export type GridColumns = (typeof GRID_COLUMNS)[number];

// ─────────────────────────────────────────────
// Carousel Direction
// ─────────────────────────────────────────────
export const CAROUSEL_DIRECTION = ["rtl", "ltr"] as const;
export type CarouselDirection = (typeof CAROUSEL_DIRECTION)[number];
