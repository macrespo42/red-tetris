import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TetrisGrid from "../components/TetrisGrid";

describe("room view", () => {
  it("render right color", () => {
    const home = render(
      <TetrisGrid
        matrix={[
          [1, 1, 1],
          [0, 0, 0],
          [2, 2, 2],
        ]}
      />,
    );
    const cellsBefore = screen.getAllByRole("gameboard");
    expect(cellsBefore[1].className).toEqual("cell yellow");
    expect(cellsBefore[4].className).toEqual("cell ");
    home.unmount();
  });
});
