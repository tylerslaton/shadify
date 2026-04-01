import { useStyle } from "@/lib/style-context";
import {
  Carousel as DefaultCarousel,
  CarouselContent as DefaultCarouselContent,
  CarouselItem as DefaultCarouselItem,
  CarouselPrevious as DefaultCarouselPrevious,
  CarouselNext as DefaultCarouselNext,
  type CarouselApi as DefaultCarouselApi,
} from "../ui-default/carousel";
import {
  Carousel as LumaCarousel,
  CarouselContent as LumaCarouselContent,
  CarouselItem as LumaCarouselItem,
  CarouselPrevious as LumaCarouselPrevious,
  CarouselNext as LumaCarouselNext,
} from "../ui-luma/carousel";

function Carousel(props: React.ComponentProps<typeof DefaultCarousel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCarousel {...props} /> : <DefaultCarousel {...props} />;
}

function CarouselContent(props: React.ComponentProps<typeof DefaultCarouselContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCarouselContent {...props} />
  ) : (
    <DefaultCarouselContent {...props} />
  );
}

function CarouselItem(props: React.ComponentProps<typeof DefaultCarouselItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCarouselItem {...props} /> : <DefaultCarouselItem {...props} />;
}

function CarouselPrevious(props: React.ComponentProps<typeof DefaultCarouselPrevious>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCarouselPrevious {...props} />
  ) : (
    <DefaultCarouselPrevious {...props} />
  );
}

function CarouselNext(props: React.ComponentProps<typeof DefaultCarouselNext>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCarouselNext {...props} /> : <DefaultCarouselNext {...props} />;
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
export { type DefaultCarouselApi as CarouselApi };
