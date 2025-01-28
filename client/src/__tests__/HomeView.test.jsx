import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeView from "../components/HomeView";

describe("home render", () => {
  it("home render", () => {
    const home = render(
      <MemoryRouter>
        <HomeView />
    </MemoryRouter>,
  );
    expect(screen.getByText(/RED TETRIS/)).toBeDefined();
    home.unmount();
  });

  it("test input pseudo", () => {
    const home = render(
      <MemoryRouter>
        <HomeView />
    </MemoryRouter>,
  );
  const input = screen.getByPlaceholderText("pseudo");
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  home.unmount();
});

  it("test input room", () => {
    const home = render(
      <MemoryRouter>
        <HomeView />
    </MemoryRouter>,
  );
  const input = screen.getByPlaceholderText("room");
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  home.unmount();
});

});

