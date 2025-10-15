import { z } from "zod";
import { CAROUSEL_DIRECTION, CAROUSEL_MODES, CAROUSEL_TRANSITIONS, GRID_COLUMNS } from "./enums";

/* ============================================================================
 * BASIC TYPES
 * ========================================================================== */
export const InlineKVSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const MediaItemSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  link: z.string().url().optional(),
});

const ImageMediaBaseSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  link: z.string().url().optional(),
  width: z.coerce.number().int().positive(),
  height: z.coerce.number().int().positive(),
  displayRatio: z
    .string()
    .regex(/^\d+:\d+$/)
    .optional(), // e.g. "16:9"
});

/* ============================================================================
 * META INFORMATION
 * ========================================================================== */
const BaseMeta = z.object({
  alt: z.string().optional(),
  url: z.string().url().optional(),
  label: z.string().optional(),
  section: z.string().optional(),
});

const ImageGridMeta = z.object({
  columns: z
    .enum(GRID_COLUMNS)
    .or(
      z
        .number()
        .int()
        .refine((n) => [2, 3, 4].includes(n))
    )
    .optional(),
});

const CarouselMeta = z.object({
  mode: z.enum(CAROUSEL_MODES).optional(),
  intervalMs: z.number().int().positive().optional(),
  slideDurationMs: z.number().int().positive().optional(), // how fast each slide animates
  transition: z.enum(CAROUSEL_TRANSITIONS).optional(),
  direction: z.enum(CAROUSEL_DIRECTION).optional(),            // slide direction for auto mode
  loop: z.boolean().optional(),
  pauseOnHover: z.boolean().optional(),
  showIndicators: z.boolean().optional(),
  showArrows: z.boolean().optional(),
  arrowSize: z.number().int().positive().optional(),      // lucide icon size
  displayRatio: z
    .string()
    .regex(/^\d+:\d+$/)
    .optional(),
});


/* ============================================================================
 * BLOCK TYPES
 * ========================================================================== */
const HeadingBlock = z.object({
  type: z.literal("heading"),
  content: z.string(),
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const SubheadingBlock = z.object({
  type: z.literal("subheading"),
  content: z.string(),
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const ParagraphBlock = z.object({
  type: z.literal("paragraph"),
  content: z.string(),
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const QuoteBlock = z.object({
  type: z.literal("quote"),
  content: z.string(),
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const ListBlock = z.object({
  type: z.literal("list"),
  content: z.string(), // semicolon-separated list
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const InlineListBlock = z.object({
  type: z.literal("inlineList"),
  content: z.array(InlineKVSchema),
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const ImageBlock = z.object({
  type: z.literal("image"),
  content: z.array(ImageMediaBaseSchema), // or ImageMediaSchema if you want the refinement here too
  order: z.number().int().nonnegative(),
  meta: BaseMeta.optional(),
});

const ImageGridBlock = z.object({
  type: z.literal("imageGrid"),
  content: z.array(ImageMediaBaseSchema), // or ImageMediaSchema
  order: z.number().int().nonnegative(),
  meta: BaseMeta.merge(ImageGridMeta).optional(),
});

const CarouselBlock = z.object({
  type: z.literal("carousel"),
  content: z.array(ImageMediaBaseSchema).min(1), // or ImageMediaSchema
  order: z.number().int().nonnegative(),
  meta: BaseMeta.merge(CarouselMeta).optional(),
});
/* ============================================================================
 * MAIN BLOCK UNION
 * ========================================================================== */
export const BlockSchema = z.discriminatedUnion("type", [
  HeadingBlock,
  SubheadingBlock,
  ParagraphBlock,
  QuoteBlock,
  ListBlock,
  InlineListBlock,
  ImageBlock,
  ImageGridBlock,
  CarouselBlock,
]);

export type Block = z.infer<typeof BlockSchema>;

/* ============================================================================
 * PROJECT STRUCTURE
 * ========================================================================== */

/**
 * Team Member item (name + role)
 */
export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  profileUrl: z.string().url().optional(),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

/**
 * GeneralInfos — project’s main details
 */
export const GeneralInfosSchema = z.object({
  title: z.string(),
  type: z.string(),
  year: z.number(),
  slug: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  teamMembers: z.array(TeamMemberSchema).default([]),
  heroUrl: z.string().url(),
});
export type GeneralInfos = z.infer<typeof GeneralInfosSchema>;

/**
 * ContentBlocksInfos — all content blocks
 */
export const ContentBlocksInfosSchema = z.array(BlockSchema).min(1);

// NEW: Notes blocks (same shape as content)
export const NotesBlocksInfosSchema = z.array(BlockSchema).default([]);

// Project (add notesBlocksInfos)
export const ProjectSchema = z.object({
 id: z.string(),
  createdAt: z.number().int().nonnegative(), // ✅ expects a number timestamp
  updatedAt: z.number().int().nonnegative(),
  published: z.boolean().default(true),
  generalInfos: GeneralInfosSchema,
  contentBlocksInfos: ContentBlocksInfosSchema,
  notesBlocksInfos: NotesBlocksInfosSchema,
});

export type Project = z.infer<typeof ProjectSchema>;

/**
 * Multiple Projects
 */
export const ProjectsSchema = z.array(ProjectSchema);
export type Projects = z.infer<typeof ProjectsSchema>;
