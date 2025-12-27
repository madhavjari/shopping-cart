import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("Home Component", () => {
  it("should render the app title in h1", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/frenzy cart/i);
  });
});
