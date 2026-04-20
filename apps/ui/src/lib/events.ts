export type Event = {
  name: string;
  properties?: Record<string, unknown>;
};

export function trackEvent(event: Event): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[event]", event.name, event.properties ?? {});
  }
}
