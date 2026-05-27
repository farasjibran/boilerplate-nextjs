import { env } from "@/lib/env";

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type LogLevel = keyof typeof LOG_LEVELS;

const currentLevel = LOG_LEVELS[env.LOG_LEVEL] ?? LOG_LEVELS.info;

function should(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= currentLevel;
}

function output(level: LogLevel, msg: string, context?: Record<string, unknown>) {
  const entry = {
    level,
    timestamp: new Date().toISOString(),
    message: msg,
    ...(context && { context }),
  };

  const method = level === "debug" ? "debug" : level === "warn" ? "warn" : level === "error" ? "error" : "info";
  (console as typeof console & Record<string, (...a: unknown[]) => void>)[method](
    JSON.stringify(entry),
  );
}

export const logger = {
  debug: (msg: string, ctx?: Record<string, unknown>) => {
    if (should("debug")) output("debug", msg, ctx);
  },
  info: (msg: string, ctx?: Record<string, unknown>) => {
    if (should("info")) output("info", msg, ctx);
  },
  warn: (msg: string, ctx?: Record<string, unknown>) => {
    if (should("warn")) output("warn", msg, ctx);
  },
  error: (msg: string, ctx?: Record<string, unknown>) => {
    output("error", msg, ctx);
  },
};
