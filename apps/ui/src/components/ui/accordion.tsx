import { useStyle } from "@/lib/style-context";
import {
  Accordion as DefaultAccordion,
  AccordionItem as DefaultAccordionItem,
  AccordionTrigger as DefaultAccordionTrigger,
  AccordionContent as DefaultAccordionContent,
} from "../ui-default/accordion";
import {
  Accordion as LumaAccordion,
  AccordionItem as LumaAccordionItem,
  AccordionTrigger as LumaAccordionTrigger,
  AccordionContent as LumaAccordionContent,
} from "../ui-luma/accordion";

function Accordion(props: React.ComponentProps<typeof DefaultAccordion>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAccordion {...props} /> : <DefaultAccordion {...props} />;
}

function AccordionItem(props: React.ComponentProps<typeof DefaultAccordionItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAccordionItem {...props} /> : <DefaultAccordionItem {...props} />;
}

function AccordionTrigger(props: React.ComponentProps<typeof DefaultAccordionTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAccordionTrigger {...props} />
  ) : (
    <DefaultAccordionTrigger {...props} />
  );
}

function AccordionContent(props: React.ComponentProps<typeof DefaultAccordionContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAccordionContent {...props} />
  ) : (
    <DefaultAccordionContent {...props} />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
