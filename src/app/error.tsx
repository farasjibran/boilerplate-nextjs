"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { ErrorState } from "@/components/ui/error-state";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    logger.error("Global error", { message: error.message, digest: error.digest });
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <ErrorState
          title="Terjadi Kesalahan"
          message={error.message || "Terjadi kesalahan yang tidak terduga."}
          onRetry={() => window.location.reload()}
        />
      </body>
    </html>
  );
}
