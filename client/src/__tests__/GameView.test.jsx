import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Button from "../components/Button";
import RoomView from "../components/RoomView";
import userEvent from "@testing-library/user-event";
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
    expect(screen.getByText("Next pieces")).toBeDefined();
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
    expect(screen.getByText("Next pieces")).toBeDefined();
    home.unmount();
  });
});
