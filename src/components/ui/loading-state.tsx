import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message, className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12",
        className,
      )}
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"
        role="status"
        aria-label={message || "Memuat..."}
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
