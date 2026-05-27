import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";
import { render, screen } from "@/tests/utils";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button", { name: /delete/i });
    expect(btn).toHaveClass("bg-destructive");
  });

  it("applies size classes", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button", { name: /small/i });
    expect(btn).toHaveClass("h-8");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });
});
