import { useStyle } from "@/lib/style-context";
import {
  Table as DefaultTable,
  TableHeader as DefaultTableHeader,
  TableBody as DefaultTableBody,
  TableFooter as DefaultTableFooter,
  TableHead as DefaultTableHead,
  TableRow as DefaultTableRow,
  TableCell as DefaultTableCell,
  TableCaption as DefaultTableCaption,
} from "../ui-default/table";
import {
  Table as LumaTable,
  TableHeader as LumaTableHeader,
  TableBody as LumaTableBody,
  TableFooter as LumaTableFooter,
  TableHead as LumaTableHead,
  TableRow as LumaTableRow,
  TableCell as LumaTableCell,
  TableCaption as LumaTableCaption,
} from "../ui-luma/table";

function Table(props: React.ComponentProps<typeof DefaultTable>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTable {...props} /> : <DefaultTable {...props} />;
}

function TableHeader(props: React.ComponentProps<typeof DefaultTableHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableHeader {...props} /> : <DefaultTableHeader {...props} />;
}

function TableBody(props: React.ComponentProps<typeof DefaultTableBody>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableBody {...props} /> : <DefaultTableBody {...props} />;
}

function TableFooter(props: React.ComponentProps<typeof DefaultTableFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableFooter {...props} /> : <DefaultTableFooter {...props} />;
}

function TableHead(props: React.ComponentProps<typeof DefaultTableHead>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableHead {...props} /> : <DefaultTableHead {...props} />;
}

function TableRow(props: React.ComponentProps<typeof DefaultTableRow>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableRow {...props} /> : <DefaultTableRow {...props} />;
}

function TableCell(props: React.ComponentProps<typeof DefaultTableCell>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableCell {...props} /> : <DefaultTableCell {...props} />;
}

function TableCaption(props: React.ComponentProps<typeof DefaultTableCaption>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTableCaption {...props} /> : <DefaultTableCaption {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
