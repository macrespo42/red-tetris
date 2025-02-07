import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Button from "../components/Button";

import userEvent from "@testing-library/user-event";
import store from "../store";
import { Provider } from "react-redux";

describe("button global components", () => {
  it("button navigation", async () => {
    const home = render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {" "}
                  <Button
                    id={"id"}
                    text={"test"}
                    to={"/lobby/room/player"}
                  />{" "}
                </div>
              }
            />
            <Route
              path="/lobby/:room/:player"
              element={<div> hello button match </div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("test"));
    expect(screen.getByText(/hello button match/)).toBeDefined();
    home.unmount();
  });

  it("renders the button with the correct text", () => {
    const home = render(<Button text="Click Me" />);
    expect(screen.getByText("Click Me")).toBeDefined();
    home.unmount();
  });
});
