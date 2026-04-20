import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams as useRrSearchParams } from "react-router-dom";

type RouterLike = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string) => void;
};

export function useRouter(): RouterLike {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => {
        /* no-op in Vite SPA */
      },
      prefetch: () => {
        /* no-op */
      },
    }),
    [navigate],
  );
}

export function usePathname(): string {
  return useLocation().pathname;
}

export function useSearchParams(): URLSearchParams {
  const [params] = useRrSearchParams();
  return useMemo(() => new URLSearchParams(params.toString()), [params]);
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const location = useLocation();
  return useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return Object.fromEntries(segments.map((s, i) => [`segment${i}`, s])) as T;
  }, [location.pathname]);
}

export const redirect = (href: string) => {
  if (typeof window !== "undefined") window.location.href = href;
};

export const notFound = () => {
  throw new Error("Not found");
};
