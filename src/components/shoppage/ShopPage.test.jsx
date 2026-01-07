import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import ShopPage from "./ShopPage";
import { MemoryRouter } from "react-router";
import HomePage from "../homepage/HomePage";

const BEFORE_ALL_TIMEOUT = 30000;

describe("shop component", () => {
  // beforeEach(() => {
  //   render(
  //     <MemoryRouter>
  //       <ShopPage />
  //     </MemoryRouter>
  //   );
  // });
  let response;
  let body;
  beforeAll(async () => {
    response = await fetch("https://fakestoreapi.com/products/");
    body = await response.json();
  }, BEFORE_ALL_TIMEOUT);

  it("Should have response status 200", () => {
    expect(response.status).toBe(200);
  });
  it("Should have 20 products", () => {
    expect(body.length).toBe(20);
  });
});
