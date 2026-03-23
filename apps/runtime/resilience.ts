/**
 * Process-level error resilience and memory monitoring.
 *
 * The Node.js runtime proxies streaming responses from the Python agent.
 * When the agent or client disconnects mid-stream, socket/fetch errors
 * surface as unhandled rejections or uncaught exceptions that would
 * otherwise crash the process.
 *
 * This module:
 * - Suppresses known network/stream errors in unhandledRejection so the
 *   process stays up for other connections.
 * - Always exits on uncaughtException (per Node.js guidance) but logs
 *   whether the error was a known network issue or a genuine bug.
 * - Periodically logs memory usage and triggers GC when RSS climbs
 *   toward the container limit (useful with --expose-gc).
 */

const IGNORABLE_ERRORS = [
  "terminated",
  "other side closed",
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "network error",
  "aborted",
  "AbortError",
  "socket hang up",
  "UND_ERR_SOCKET",
];

function isIgnorable(err: unknown): boolean {
  const msg =
    err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  if (IGNORABLE_ERRORS.some((token) => msg.includes(token))) return true;
  // Check cause chain (Node.js fetch wraps network errors)
  if (err instanceof Error && err.cause) {
    return isIgnorable(err.cause);
  }
  return false;
}

process.on("unhandledRejection", (err: unknown) => {
  if (isIgnorable(err)) {
    console.warn(
      "[unhandledRejection] Suppressed:",
      err instanceof Error ? err.message : String(err),
    );
    return;
  }
  console.error("[unhandledRejection]", err);
});

process.on("uncaughtException", (err: Error) => {
  if (isIgnorable(err)) {
    console.error("[uncaughtException] Ignorable but fatal (unsafe to continue):", err.message);
  } else {
    console.error("[uncaughtException] Fatal:", err);
  }
  process.exit(1);
});

// --- Memory monitoring ---

const MEMORY_LOG_INTERVAL_MS = 60_000;
const MEMORY_WARN_THRESHOLD_MB = 200;

setInterval(() => {
  const mem = process.memoryUsage();
  const rssMb = Math.round(mem.rss / 1024 / 1024);
  const heapMb = Math.round(mem.heapUsed / 1024 / 1024);
  if (rssMb > MEMORY_WARN_THRESHOLD_MB) {
    console.warn(
      `[memory] WARNING RSS=${rssMb}MB heap=${heapMb}MB — approaching limit`,
    );
    if (global.gc) {
      console.warn("[memory] Forcing garbage collection");
      global.gc();
    }
  }
}, MEMORY_LOG_INTERVAL_MS).unref();
