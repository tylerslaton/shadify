import { useStyle } from "@/lib/style-context";
import {
  Pagination as DefaultPagination,
  PaginationContent as DefaultPaginationContent,
  PaginationLink as DefaultPaginationLink,
  PaginationItem as DefaultPaginationItem,
  PaginationPrevious as DefaultPaginationPrevious,
  PaginationNext as DefaultPaginationNext,
  PaginationEllipsis as DefaultPaginationEllipsis,
} from "../ui-default/pagination";
import {
  Pagination as LumaPagination,
  PaginationContent as LumaPaginationContent,
  PaginationLink as LumaPaginationLink,
  PaginationItem as LumaPaginationItem,
  PaginationPrevious as LumaPaginationPrevious,
  PaginationNext as LumaPaginationNext,
  PaginationEllipsis as LumaPaginationEllipsis,
} from "../ui-luma/pagination";

function Pagination(props: React.ComponentProps<typeof DefaultPagination>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaPagination {...props} /> : <DefaultPagination {...props} />;
}

function PaginationContent(props: React.ComponentProps<typeof DefaultPaginationContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationContent {...props} />
  ) : (
    <DefaultPaginationContent {...props} />
  );
}

function PaginationLink(props: React.ComponentProps<typeof DefaultPaginationLink>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationLink {...props} />
  ) : (
    <DefaultPaginationLink {...props} />
  );
}

function PaginationItem(props: React.ComponentProps<typeof DefaultPaginationItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationItem {...props} />
  ) : (
    <DefaultPaginationItem {...props} />
  );
}

function PaginationPrevious(props: React.ComponentProps<typeof DefaultPaginationPrevious>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationPrevious {...props} />
  ) : (
    <DefaultPaginationPrevious {...props} />
  );
}

function PaginationNext(props: React.ComponentProps<typeof DefaultPaginationNext>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationNext {...props} />
  ) : (
    <DefaultPaginationNext {...props} />
  );
}

function PaginationEllipsis(props: React.ComponentProps<typeof DefaultPaginationEllipsis>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPaginationEllipsis {...props} />
  ) : (
    <DefaultPaginationEllipsis {...props} />
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
