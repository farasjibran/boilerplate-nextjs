import { describe, it, expect } from "vitest";
import { EmptyState } from "@/components/ui/empty-state";
import { render, screen } from "@/tests/utils";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No items" description="Add one to continue" />);
    expect(screen.getByText("Add one to continue")).toBeInTheDocument();
  });

  it("renders action link when provided", () => {
    render(<EmptyState title="No items" action={{ label: "Add", href: "/new" }} />);
    expect(screen.getByRole("link", { name: /add/i })).toHaveAttribute(
      "href",
      "/new",
    );
  });
});
