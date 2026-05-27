"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { ErrorState } from "@/components/ui/error-state";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <ErrorState
          title="Kesalahan Sistem"
          message={error.message || "Terjadi kesalahan yang tidak terduga."}
          onRetry={() => window.location.reload()}
        />
      </body>
    </html>
  );
}
