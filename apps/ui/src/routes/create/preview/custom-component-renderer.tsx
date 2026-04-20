import * as React from "react"
import {
  ActivityIcon,
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  CheckCircle2Icon,
  CheckIcon,
  CircleDotIcon,
  ClockIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CompassIcon,
  CpuIcon,
  CreditCardIcon,
  DollarSignIcon,
  DropletsIcon,
  FileTextIcon,
  FlameIcon,
  GaugeIcon,
  GiftIcon,
  GlobeIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  InfoIcon,
  LayersIcon,
  LineChartIcon,
  MailIcon,
  MapPinIcon,
  MinusIcon,
  MoonIcon,
  MusicIcon,
  PackageIcon,
  PieChartIcon,
  PlayIcon,
  PlusIcon,
  RocketIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StarIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  ThermometerIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TruckIcon,
  UserIcon,
  UsersIcon,
  WindIcon,
  XIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge, badgeVariants } from "@/registry/new-york-v4/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { useCustomComponent } from "@/routes/create/hooks/use-custom-component"
import type {
  CustomComponentNode,
  Tone,
} from "@/routes/create/lib/custom-component-spec"
import type { VariantProps } from "class-variance-authority"

const ICONS: Record<string, LucideIcon> = {
  activity: ActivityIcon,
  alertcircle: AlertCircleIcon,
  arrowdown: ArrowDownIcon,
  arrowup: ArrowUpIcon,
  barchart: BarChart3Icon,
  bell: BellIcon,
  bookmark: BookmarkIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  checkcircle: CheckCircle2Icon,
  circledot: CircleDotIcon,
  clock: ClockIcon,
  cloud: CloudIcon,
  cloudrain: CloudRainIcon,
  cloudsnow: CloudSnowIcon,
  compass: CompassIcon,
  cpu: CpuIcon,
  creditcard: CreditCardIcon,
  dollarsign: DollarSignIcon,
  droplets: DropletsIcon,
  filetext: FileTextIcon,
  flame: FlameIcon,
  gauge: GaugeIcon,
  gift: GiftIcon,
  globe: GlobeIcon,
  heart: HeartIcon,
  home: HomeIcon,
  image: ImageIcon,
  inbox: InboxIcon,
  info: InfoIcon,
  layers: LayersIcon,
  linechart: LineChartIcon,
  mail: MailIcon,
  mappin: MapPinIcon,
  minus: MinusIcon,
  moon: MoonIcon,
  music: MusicIcon,
  package: PackageIcon,
  piechart: PieChartIcon,
  play: PlayIcon,
  plus: PlusIcon,
  rocket: RocketIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  shoppingcart: ShoppingCartIcon,
  sparkles: SparklesIcon,
  star: StarIcon,
  sun: SunIcon,
  sunrise: SunriseIcon,
  sunset: SunsetIcon,
  thermometer: ThermometerIcon,
  trendingdown: TrendingDownIcon,
  trendingup: TrendingUpIcon,
  truck: TruckIcon,
  user: UserIcon,
  users: UsersIcon,
  wind: WindIcon,
  x: XIcon,
  zap: ZapIcon,
}

function resolveIcon(name: string): LucideIcon {
  const key = name.toLowerCase().replace(/[-_\s]|icon$/gi, "")
  return ICONS[key] ?? SparklesIcon
}

function toneTextClass(tone: Tone | undefined): string {
  switch (tone) {
    case "muted":
      return "text-muted-foreground"
    case "primary":
      return "text-primary"
    case "secondary":
      return "text-foreground/80"
    case "accent":
      return "text-accent-foreground"
    case "destructive":
      return "text-destructive"
    default:
      return "text-foreground"
  }
}

function toneBadgeVariant(
  tone: Tone | undefined
): VariantProps<typeof badgeVariants>["variant"] {
  switch (tone) {
    case "secondary":
    case "muted":
      return "secondary"
    case "destructive":
      return "destructive"
    case "accent":
      return "outline"
    default:
      return "default"
  }
}

const GAP = { sm: "gap-2", md: "gap-3", lg: "gap-5" } as const
const ALIGN = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const
const COLS = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const
const HEADING_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: "text-3xl font-semibold tracking-tight",
  2: "text-2xl font-semibold tracking-tight",
  3: "text-lg font-semibold",
  4: "text-sm font-semibold uppercase tracking-wide",
}
const TEXT_SIZE = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
} as const
const TEXT_WEIGHT = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const
const ASPECT = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
} as const

function NodeList({ nodes }: { nodes: CustomComponentNode[] }) {
  return (
    <>
      {nodes.map((child, i) => (
        <RenderNode key={i} node={child} />
      ))}
    </>
  )
}

function RenderNode({ node }: { node: CustomComponentNode }) {
  switch (node.type) {
    case "heading": {
      const level = node.level ?? 2
      const Tag = (`h${level}` as unknown) as keyof React.JSX.IntrinsicElements
      return React.createElement(
        Tag,
        {
          className: cn(
            HEADING_CLASS[level],
            toneTextClass(node.tone),
            "font-(family-name:--font-heading)"
          ),
        },
        node.text
      )
    }
    case "text":
      return (
        <p
          className={cn(
            TEXT_SIZE[node.size ?? "sm"],
            TEXT_WEIGHT[node.weight ?? "normal"],
            toneTextClass(node.tone)
          )}
        >
          {node.text}
        </p>
      )
    case "badge":
      return <Badge variant={toneBadgeVariant(node.tone)}>{node.text}</Badge>
    case "icon": {
      const Icon = resolveIcon(node.name)
      const size = node.size ?? 20
      return (
        <Icon
          className={toneTextClass(node.tone)}
          style={{ width: size, height: size }}
        />
      )
    }
    case "stat": {
      const trend = node.trend ?? "none"
      const TrendIcon =
        trend === "up"
          ? TrendingUpIcon
          : trend === "down"
            ? TrendingDownIcon
            : trend === "flat"
              ? MinusIcon
              : null
      const trendClass =
        trend === "up"
          ? "text-emerald-600 dark:text-emerald-400"
          : trend === "down"
            ? "text-destructive"
            : "text-muted-foreground"
      return (
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {node.label}
          </div>
          <div className="text-3xl font-semibold tracking-tight text-foreground font-(family-name:--font-heading)">
            {node.value}
          </div>
          {TrendIcon && node.trendValue && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                trendClass
              )}
            >
              <TrendIcon className="size-3.5" />
              {node.trendValue}
            </div>
          )}
        </div>
      )
    }
    case "progress":
      return (
        <div className="flex flex-col gap-1.5">
          {node.label && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{node.label}</span>
              <span className="font-medium tabular-nums text-foreground">
                {Math.round(node.value)}%
              </span>
            </div>
          )}
          <Progress value={node.value} />
        </div>
      )
    case "separator":
      return <Separator orientation={node.orientation ?? "horizontal"} />
    case "image":
      return (
        <img
          src={node.src}
          alt={node.alt ?? ""}
          className={cn(
            "w-full rounded-md object-cover",
            node.aspect && ASPECT[node.aspect]
          )}
          loading="lazy"
        />
      )
    case "card": {
      const hasHeader = Boolean(node.title || node.description)
      return (
        <Card>
          {hasHeader && (
            <CardHeader>
              {node.title && <CardTitle>{node.title}</CardTitle>}
              {node.description && (
                <CardDescription>{node.description}</CardDescription>
              )}
            </CardHeader>
          )}
          <CardContent className="flex flex-col gap-3">
            <NodeList nodes={node.children} />
          </CardContent>
          {node.footer && node.footer.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2">
              <NodeList nodes={node.footer} />
            </CardFooter>
          )}
        </Card>
      )
    }
    case "column":
      return (
        <div className={cn("flex flex-col", GAP[node.gap ?? "md"])}>
          <NodeList nodes={node.children} />
        </div>
      )
    case "row":
      return (
        <div
          className={cn(
            "flex flex-row items-center",
            GAP[node.gap ?? "md"],
            ALIGN[node.align ?? "start"]
          )}
        >
          <NodeList nodes={node.children} />
        </div>
      )
    case "grid":
      return (
        <div
          className={cn(
            "grid",
            COLS[node.columns],
            GAP[node.gap ?? "md"]
          )}
        >
          <NodeList nodes={node.children} />
        </div>
      )
  }
}

function EmptyState() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SparklesIcon className="size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-foreground">
          No custom component yet
        </div>
        <div className="max-w-sm text-xs text-muted-foreground">
          Ask the assistant to build something — try &ldquo;create a weather
          card&rdquo; or &ldquo;build a pricing card with three tiers.&rdquo;
        </div>
      </div>
    </div>
  )
}

function BuildingState({ title }: { title: string }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <div className="rounded-xl border border-dashed border-foreground/20 bg-muted/30 p-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-4 shrink-0 rounded-full border-2 border-foreground/15 border-t-foreground/60 motion-safe:animate-spin"
            style={{ animationDuration: "900ms" }}
          />
          <div className="flex min-w-0 flex-col">
            <div className="text-sm font-medium text-foreground">
              Building &ldquo;{title}&rdquo;…
            </div>
            <div className="text-xs text-muted-foreground">
              Panel 03 will update shortly.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomComponentRenderer() {
  const { spec, version, buildingTitle } = useCustomComponent()

  if (buildingTitle) return <BuildingState title={buildingTitle} />
  if (!spec) return <EmptyState />

  return (
    <div
      key={version}
      className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6"
    >
      <RenderNode node={spec.root} />
    </div>
  )
}
