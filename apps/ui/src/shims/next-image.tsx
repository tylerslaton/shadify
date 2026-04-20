import * as React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loader?: unknown;
};

const NextImage = React.forwardRef<HTMLImageElement, ImgProps>(function NextImage(
  { fill, priority, unoptimized, placeholder, blurDataURL, quality, loader, style, ...props },
  ref,
) {
  const mergedStyle = fill
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, ...style }
    : style;
  return <img ref={ref} style={mergedStyle} {...props} />;
});

export default NextImage;
