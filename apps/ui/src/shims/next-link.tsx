import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type NextLinkProps = {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(function NextLink(
  { href, prefetch, replace, scroll, shallow, passHref, locale, legacyBehavior, ...rest },
  ref,
) {
  const isExternal = /^([a-z]+:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  if (isExternal) {
    return <a ref={ref} href={href} {...rest} />;
  }
  return <RouterLink ref={ref} to={href} replace={replace} {...(rest as any)} />;
});

export default NextLink;
