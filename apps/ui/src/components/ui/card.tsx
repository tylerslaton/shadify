import { useStyle } from "@/lib/style-context";
import {
  Card as DefaultCard,
  CardHeader as DefaultCardHeader,
  CardFooter as DefaultCardFooter,
  CardTitle as DefaultCardTitle,
  CardAction as DefaultCardAction,
  CardDescription as DefaultCardDescription,
  CardContent as DefaultCardContent,
} from "../ui-default/card";
import {
  Card as LumaCard,
  CardHeader as LumaCardHeader,
  CardFooter as LumaCardFooter,
  CardTitle as LumaCardTitle,
  CardAction as LumaCardAction,
  CardDescription as LumaCardDescription,
  CardContent as LumaCardContent,
} from "../ui-luma/card";

function Card(props: React.ComponentProps<typeof DefaultCard>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCard {...props} /> : <DefaultCard {...props} />;
}

function CardHeader(props: React.ComponentProps<typeof DefaultCardHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCardHeader {...props} /> : <DefaultCardHeader {...props} />;
}

function CardFooter(props: React.ComponentProps<typeof DefaultCardFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCardFooter {...props} /> : <DefaultCardFooter {...props} />;
}

function CardTitle(props: React.ComponentProps<typeof DefaultCardTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCardTitle {...props} /> : <DefaultCardTitle {...props} />;
}

function CardAction(props: React.ComponentProps<typeof DefaultCardAction>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCardAction {...props} /> : <DefaultCardAction {...props} />;
}

function CardDescription(props: React.ComponentProps<typeof DefaultCardDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCardDescription {...props} />
  ) : (
    <DefaultCardDescription {...props} />
  );
}

function CardContent(props: React.ComponentProps<typeof DefaultCardContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCardContent {...props} /> : <DefaultCardContent {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
