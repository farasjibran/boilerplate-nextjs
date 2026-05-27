import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; href: string };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className,
      )}
    >
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button variant="secondary" asChild>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
