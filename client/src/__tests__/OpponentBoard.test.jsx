import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import OpponentBoard from "../components/OpponentBoard";

describe("NextPiece Component", () => {
  it("renders the correct number of cells with appropriate colors", () => {
    const matrix = [
      [1, 0, 3],
      [0, 2, 0],
      [4, 0, 5],
    ];

    const { container } = render(<OpponentBoard matrix={matrix} />);
    const cells = container.querySelectorAll(".opponent-cell");

    expect(cells.length).toBe(9);

    expect(cells[0].className).toEqual("opponent-cell yellow");
    expect(cells[1].className).not.toEqual("opponent-cell yellow");
    expect(cells[2].className).toEqual("opponent-cell red");
    expect(cells[3].className).not.toEqual("opponent-cell green");
    expect(cells[4].className).toEqual("opponent-cell green");
    expect(cells[5].className).not.toEqual("opponent-cell green");
    expect(cells[6].className).toEqual("opponent-cell purple");
    expect(cells[7].className).not.toEqual("opponent-cell orange");
    expect(cells[8].className).toEqual("opponent-cell orange");
  });
});
