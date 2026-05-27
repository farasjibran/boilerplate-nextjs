import { env } from "@/lib/env";

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type LogLevel = keyof typeof LOG_LEVELS;

const currentLevel = LOG_LEVELS[env.LOG_LEVEL] ?? LOG_LEVELS.info;

function format(level: LogLevel, msg: string): string {
  return `[${level.toUpperCase()}] ${msg}`;
}

function should(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= currentLevel;
}

export const logger = {
  debug: (msg: string, ...args: unknown[]) => {
    if (should("debug")) console.debug(format("debug", msg), ...args);
  },
  info: (msg: string, ...args: unknown[]) => {
    if (should("info")) console.info(format("info", msg), ...args);
  },
  warn: (msg: string, ...args: unknown[]) => {
    if (should("warn")) console.warn(format("warn", msg), ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(format("error", msg), ...args);
  },
};
