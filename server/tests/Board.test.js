import Game from "../src/game_engine/Game";
import { test, expect, jest, it } from "@jest/globals";
import Player from "../src/game_engine/Player";
import Piece from "../src/game_engine/Piece";
import Board from "../src/game_engine/Board";

describe("Board Class", () => {
  let board;
  let piece;

  beforeEach(() => {
    board = new Board();
    board.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    board.currentPenalty = 0;
  });
  it("check full row", () => {
    board = new Board();
    board.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(1));
    const nbr = board.checkForFullRows();
    expect(nbr).toBe(10);
  });

  it("inflictPenalty", () => {
    board.inflictPenalty(3);
    expect(board).toBeDefined();
    expect(board.currentPenalty).toBe(3);
  });
  it("check  rotate", () => {
    board = new Board();
    board.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    board.height = 10;
    board.width = 10;

    piece = {
      currentRotation: 0,
      shape: [
        [
          { x: -1, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ],
      ],
      nextRotation: jest.fn(function () {
        this.currentRotation = (this.currentRotation + 1) % this.shape.length;
      }),
      previousRotation: jest.fn(function () {
        this.currentRotation = (this.currentRotation - 1 + this.shape.length) % this.shape.length;
      }),
      isInPiece: jest.fn((x, y) => {
        return piece.shape[piece.currentRotation].some((pos) => pos.x === x && pos.y === y);
      }),
    };
    board.grid[1][1] = 1;

    const result = board.rotate(piece);

    expect(piece.previousRotation).toHaveBeenCalled();
    expect(result).toBe(piece);

    board.grid[1][1] = 0;

    const resultNoCollision = board.rotate(piece);

    expect(piece.nextRotation).toHaveBeenCalledTimes(2);
    expect(resultNoCollision).toBe(piece);
  });
  it("check rotate none piece", () => {
    const resRotate = board.rotate(null);
    expect(resRotate).toBe(null);
  });
  it("check  moveHorizontally none piece", () => {
    const resmoveHorizontally = board.moveHorizontally(null, "left");
    expect(resmoveHorizontally).toBe(null);
  });
  it("check  moveHorizontally", () => {
    board = new Board();
    board.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    board.height = 10;
    board.width = 10;

    piece = {
      currentRotation: 0,
      shape: [
        [
          { x: 1, y: 10 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ],
      ],
      nextRotation: jest.fn(function () {
        this.currentRotation = (this.currentRotation + 1) % this.shape.length;
      }),
      previousRotation: jest.fn(function () {
        this.currentRotation = (this.currentRotation - 1 + this.shape.length) % this.shape.length;
      }),
      isInPiece: jest.fn((x, y) => {
        return piece.shape[piece.currentRotation].some((pos) => pos.x === x && pos.y === y);
      }),
    };
    board.grid[1][1] = 1;

    const result = board.rotate(piece);

    expect(piece.previousRotation).toHaveBeenCalled();
    expect(result).toBe(piece);

    const resultNoCollision = board.moveHorizontally(piece, "right");
    expect(piece.nextRotation).toHaveBeenCalledTimes(1);
    expect(resultNoCollision).toBe(piece);
  });
  it("check  insert piece", () => {
    board = new Board();
    board.grid = Array(10)
      .fill()
      .map(() => Array(10).fill(Math.random()));
    board.height = 10;
    board.width = 10;

    piece = {
      currentRotation: 0,
      shape: [
        [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      ],
    };
    board.grid[0][3] = 1;
    const resultNoCollision = board.insertPiece(piece);
    expect(resultNoCollision).toBe(null);
  });
});
