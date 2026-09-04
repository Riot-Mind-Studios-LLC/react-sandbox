import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DemoTestedCounter from "./DemoTestedCounter";

describe("DemoTestedCounter", () => {
  it("starts at 0", () => {
    render(<DemoTestedCounter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments when the button is clicked", () => {
    render(<DemoTestedCounter />);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.click(button);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});