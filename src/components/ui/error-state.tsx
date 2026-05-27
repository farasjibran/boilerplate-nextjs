import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title, message, onRetry, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className,
      )}
    >
      <div className="rounded-full bg-destructive/10 p-3 text-2xl">
        !
      </div>
      <div>
        <h3 className="text-lg font-medium text-destructive">{title}</h3>
        {message && (
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        )}
      </div>
      {onRetry && (
        <Button variant="destructive" onClick={onRetry}>
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
