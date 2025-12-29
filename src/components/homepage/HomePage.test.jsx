import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";

describe("Home Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });
  it("should render the app title in h1", () => {
    const heading1 = screen.getByRole("heading", { level: 1 });
    const heading2 = screen.getAllByRole("heading", { level: 2 });
    const heading3 = screen.getAllByRole("heading", { level: 3 });
    const heading4 = screen.getAllByRole("heading", { level: 4 });
    expect(heading1).toBeInTheDocument();
    expect(heading2).toHaveLength(2);
    expect(heading3).toHaveLength(2);
    expect(heading4).toHaveLength(2);
    expect(heading1).toHaveTextContent(/Frenzy Cart/i);
  });
  it("should render an image", () => {
    const image = screen.getByRole("img", { name: /Home page photo/i });
    expect(image).toBeInTheDocument();
  });
  it("should have shop link", () => {
    const link = screen.getByRole("link", { name: /Shop now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });
});
