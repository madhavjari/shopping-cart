import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import ShopPage from "./ShopPage";

describe("shop component", () => {
  beforeEach(() => {
    render(<ShopPage />);
  });
});
