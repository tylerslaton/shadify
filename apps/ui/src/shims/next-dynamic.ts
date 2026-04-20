import { lazy, type ComponentType } from "react";

type DynamicOptions = {
  ssr?: boolean;
  loading?: ComponentType;
};

export default function dynamic<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T } | T>,
  _options?: DynamicOptions,
): T {
  return lazy(async () => {
    const mod = await loader();
    return "default" in mod ? (mod as { default: T }) : { default: mod as T };
  }) as unknown as T;
}
