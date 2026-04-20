import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { DesignSystemProvider } from "@/routes/create/components/design-system-provider";
import { getBaseComponent } from "@/routes/create/lib/api";
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params";
import type { BaseName } from "@/registry/config";

function PreviewSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-6">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}

export function InlinePreview({ isDark }: { isDark?: boolean }) {
  const [params] = useDesignSystemSearchParams();
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setComponent(null);
    setError(null);
    getBaseComponent(params.item, params.base as BaseName)
      .then((comp) => {
        if (cancelled) return;
        if (!comp) {
          setError(`No registry item for ${params.base}/${params.item}`);
          return;
        }
        setComponent(() => comp as React.ComponentType);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [params.base, params.item]);

  return (
    <DesignSystemProvider isDark={isDark} className="h-full w-full overflow-auto">
      <React.Suspense fallback={<PreviewSkeleton />}>
        {error ? (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
            {error}
          </div>
        ) : Component ? (
          <Component />
        ) : (
          <PreviewSkeleton />
        )}
      </React.Suspense>
    </DesignSystemProvider>
  );
}
