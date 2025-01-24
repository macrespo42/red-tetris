import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import store from "../store";
import { Provider } from "react-redux";
import GameView from "../components/GameView";

describe("Gameview", () => {
  it("render text", () => {
    const home = render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<GameView/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText(/Next piece:/i)).toBeDefined();
    home.unmount();
  });
    it("socket test", () => {
    const home = render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<GameView/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText(/Next piece:/i)).toBeDefined();
    home.unmount();
  });
});
