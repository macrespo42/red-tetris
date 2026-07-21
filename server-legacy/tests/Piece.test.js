import Game from "../src/game_engine/Game";
import { test, expect, jest } from "@jest/globals";
import Player from "../src/game_engine/Player";
import Piece from "../src/game_engine/Piece";

describe("Piece Class", () => {
  let piece;

  beforeEach(() => {
    piece = new Piece();
  });

  it("new Piece", () => {
    const piece = new Piece("0");
    expect(piece.color).toBe(1);
  });
  it("new Piece", () => {
    const piece = new Piece("S");
    expect(piece.color).toBe(2);
  });
  it("new Piece", () => {
    const piece = new Piece("Z");
    expect(piece.color).toBe(3);
  });
  it("new Piece", () => {
    const piece = new Piece("T");
    expect(piece.color).toBe(4);
  });
  it("new Piece", () => {
    const piece = new Piece("T");
    expect(piece.color).toBe(4);
  });
  it("new Piece", () => {
    const piece = new Piece("L");
    expect(piece.color).toBe(5);
  });
  it("new Piece", () => {
    const piece = new Piece("J");
    expect(piece.color).toBe(6);
  });
  it("new Piece", () => {
    const piece = new Piece("I");
    expect(piece.color).toBe(7);
  });
  it("next rotation", () => {
    piece.currentRotation = piece.shape.length;
    piece.nextRotation();
    expect(piece.currentRotation).toBe(0);
  });
  it("previous rotation", () => {
    piece.currentRotation = 0;
    piece.previousRotation();
    expect(piece.currentRotation).toBe(piece.shape.length - 1);
  });
});
