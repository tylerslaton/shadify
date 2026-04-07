import { useStyle } from "@/lib/style-context";
import {
  Breadcrumb as DefaultBreadcrumb,
  BreadcrumbList as DefaultBreadcrumbList,
  BreadcrumbItem as DefaultBreadcrumbItem,
  BreadcrumbLink as DefaultBreadcrumbLink,
  BreadcrumbPage as DefaultBreadcrumbPage,
  BreadcrumbSeparator as DefaultBreadcrumbSeparator,
  BreadcrumbEllipsis as DefaultBreadcrumbEllipsis,
} from "../ui-default/breadcrumb";
import {
  Breadcrumb as LumaBreadcrumb,
  BreadcrumbList as LumaBreadcrumbList,
  BreadcrumbItem as LumaBreadcrumbItem,
  BreadcrumbLink as LumaBreadcrumbLink,
  BreadcrumbPage as LumaBreadcrumbPage,
  BreadcrumbSeparator as LumaBreadcrumbSeparator,
  BreadcrumbEllipsis as LumaBreadcrumbEllipsis,
} from "../ui-luma/breadcrumb";

function Breadcrumb(props: React.ComponentProps<typeof DefaultBreadcrumb>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaBreadcrumb {...props} /> : <DefaultBreadcrumb {...props} />;
}

function BreadcrumbList(props: React.ComponentProps<typeof DefaultBreadcrumbList>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbList {...props} />
  ) : (
    <DefaultBreadcrumbList {...props} />
  );
}

function BreadcrumbItem(props: React.ComponentProps<typeof DefaultBreadcrumbItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbItem {...props} />
  ) : (
    <DefaultBreadcrumbItem {...props} />
  );
}

function BreadcrumbLink(props: React.ComponentProps<typeof DefaultBreadcrumbLink>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbLink {...props} />
  ) : (
    <DefaultBreadcrumbLink {...props} />
  );
}

function BreadcrumbPage(props: React.ComponentProps<typeof DefaultBreadcrumbPage>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbPage {...props} />
  ) : (
    <DefaultBreadcrumbPage {...props} />
  );
}

function BreadcrumbSeparator(props: React.ComponentProps<typeof DefaultBreadcrumbSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbSeparator {...props} />
  ) : (
    <DefaultBreadcrumbSeparator {...props} />
  );
}

function BreadcrumbEllipsis(props: React.ComponentProps<typeof DefaultBreadcrumbEllipsis>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaBreadcrumbEllipsis {...props} />
  ) : (
    <DefaultBreadcrumbEllipsis {...props} />
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
