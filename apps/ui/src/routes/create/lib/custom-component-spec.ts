import { z } from "zod"

export const TONES = [
  "default",
  "muted",
  "primary",
  "secondary",
  "accent",
  "destructive",
] as const
export type Tone = (typeof TONES)[number]

const toneSchema = z.enum(TONES).optional()

const headingSchema = z.object({
  type: z.literal("heading"),
  text: z.string().min(1),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  tone: toneSchema,
})

const textSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  tone: toneSchema,
  size: z.enum(["xs", "sm", "base", "lg"]).optional(),
  weight: z.enum(["normal", "medium", "semibold", "bold"]).optional(),
})

const badgeSchema = z.object({
  type: z.literal("badge"),
  text: z.string().min(1),
  tone: toneSchema,
})

const iconSchema = z.object({
  type: z.literal("icon"),
  name: z.string().min(1),
  size: z.number().int().min(12).max(96).optional(),
  tone: toneSchema,
})

const statSchema = z.object({
  type: z.literal("stat"),
  label: z.string().min(1),
  value: z.string().min(1),
  trend: z.enum(["up", "down", "flat", "none"]).optional(),
  trendValue: z.string().optional(),
})

const progressSchema = z.object({
  type: z.literal("progress"),
  value: z.number().min(0).max(100),
  label: z.string().optional(),
})

const separatorSchema = z.object({
  type: z.literal("separator"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
})

const imageSchema = z.object({
  type: z.literal("image"),
  src: z.string().url(),
  alt: z.string().default(""),
  aspect: z.enum(["square", "video", "portrait"]).optional(),
})

// Containers use z.lazy for recursion.
type Node =
  | z.infer<typeof headingSchema>
  | z.infer<typeof textSchema>
  | z.infer<typeof badgeSchema>
  | z.infer<typeof iconSchema>
  | z.infer<typeof statSchema>
  | z.infer<typeof progressSchema>
  | z.infer<typeof separatorSchema>
  | z.infer<typeof imageSchema>
  | CardNode
  | ColumnNode
  | RowNode
  | GridNode

type CardNode = {
  type: "card"
  title?: string
  description?: string
  footer?: Node[]
  children: Node[]
}
type ColumnNode = { type: "column"; gap?: "sm" | "md" | "lg"; children: Node[] }
type RowNode = {
  type: "row"
  gap?: "sm" | "md" | "lg"
  align?: "start" | "center" | "end" | "between"
  children: Node[]
}
type GridNode = { type: "grid"; columns: 2 | 3 | 4; gap?: "sm" | "md" | "lg"; children: Node[] }

const nodeSchema: z.ZodType<Node> = z.lazy(() =>
  z.union([
    headingSchema,
    textSchema,
    badgeSchema,
    iconSchema,
    statSchema,
    progressSchema,
    separatorSchema,
    imageSchema,
    cardSchema,
    columnSchema,
    rowSchema,
    gridSchema,
  ])
)

const cardSchema: z.ZodType<CardNode> = z.lazy(() =>
  z.object({
    type: z.literal("card"),
    title: z.string().optional(),
    description: z.string().optional(),
    footer: z.array(nodeSchema).optional(),
    children: z.array(nodeSchema),
  })
)

const columnSchema: z.ZodType<ColumnNode> = z.lazy(() =>
  z.object({
    type: z.literal("column"),
    gap: z.enum(["sm", "md", "lg"]).optional(),
    children: z.array(nodeSchema),
  })
)

const rowSchema: z.ZodType<RowNode> = z.lazy(() =>
  z.object({
    type: z.literal("row"),
    gap: z.enum(["sm", "md", "lg"]).optional(),
    align: z.enum(["start", "center", "end", "between"]).optional(),
    children: z.array(nodeSchema),
  })
)

const gridSchema: z.ZodType<GridNode> = z.lazy(() =>
  z.object({
    type: z.literal("grid"),
    columns: z.union([z.literal(2), z.literal(3), z.literal(4)]),
    gap: z.enum(["sm", "md", "lg"]).optional(),
    children: z.array(nodeSchema),
  })
)

export const customComponentSpecSchema = z.object({
  title: z.string().min(1),
  root: nodeSchema,
})

export type CustomComponentSpec = z.infer<typeof customComponentSpecSchema>
export type CustomComponentNode = Node

export function parseCustomComponentSpec(input: unknown):
  | { ok: true; value: CustomComponentSpec }
  | { ok: false; error: string } {
  const result = customComponentSpecSchema.safeParse(input)
  if (result.success) return { ok: true, value: result.data }
  const issues = result.error.issues
    .slice(0, 5)
    .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
    .join("; ")
  return { ok: false, error: `Invalid spec — ${issues}` }
}
