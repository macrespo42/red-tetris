import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import NextPiece from "../components/NextPiece";


describe('NextPiece Component', () => {
  it('renders the correct number of cells with appropriate colors', () => {
    const matrix = [
      [1, 0, 3],
      [0, 2, 0],
      [4, 0, 5],
    ];

    const { container } = render(<NextPiece matrix={matrix} />);
    const cells = container.querySelectorAll('.cell-mini');

    expect(cells.length).toBe(9);

        expect(cells[0].className).toEqual("cell-mini yellow")
        expect(cells[1].className).not.toEqual("cell-mini yellow")
        expect(cells[2].className).toEqual("cell-mini red")
        expect(cells[3].className).not.toEqual("cell-mini green")
        expect(cells[4].className).toEqual("cell-mini green")
        expect(cells[5].className).not.toEqual("cell-mini green")
        expect(cells[6].className).toEqual("cell-mini purple")
        expect(cells[7].className).not.toEqual("cell-mini orange")
        expect(cells[8].className).toEqual("cell-mini orange")
  });
});