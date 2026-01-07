import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ShopPage from "./ShopPage";
import { useOutletContext } from "react-router";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useOutletContext: vi.fn(),
}));

describe("shop component", () => {
  const mockSetProducts = vi.fn();
  const mockSetProductInCart = vi.fn();
  const mockProducts = [
    {
      id: 1,
      title: "product1",
      image: "./product1image.jpg",
      price: 65,
      quantity: 0,
    },
    {
      id: 2,
      title: "product2",
      image: "./product2image.jpg",
      price: 70,
      quantity: 0,
    },
  ];
  beforeEach(() => {
    vi.clearAllMocks();
    useOutletContext.mockReturnValue({
      products: mockProducts,
      setProducts: mockSetProducts,
      productInCart: [],
      setProductInCart: mockSetProductInCart,
    });
  });
  global.fetch = vi.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockProducts),
    })
  );
  it("should have products", async () => {
    render(<ShopPage />);
    expect(document.querySelector('[class*="loader"]')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("product1")).toBeInTheDocument();
    });
  });

  it("calls updateCart when clicking + - button", async () => {
    const user = userEvent.setup();
    useOutletContext.mockReturnValue({
      products: mockProducts,
      setProducts: mockSetProducts,
      productInCart: [],
      setProductInCart: mockSetProductInCart,
    });
    render(<ShopPage />);
    await waitFor(async () => {
      const addButton = screen.getAllByRole("button", { name: "+" });
      expect(addButton[0]).toBeInTheDocument();
      await user.click(addButton[0]);
      expect(mockSetProductInCart).toHaveBeenCalled();
      const subButton = screen.getAllByRole("button", { name: "-" });
      expect(subButton[1]).toBeInTheDocument();
      await user.click(subButton[1]);
      expect(mockSetProductInCart).toHaveBeenCalled();
    });
  });
});
