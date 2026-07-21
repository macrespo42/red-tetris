import Game from "../src/game_engine/Game";
import { test, expect, jest } from "@jest/globals";
import Player from "../src/game_engine/Player";
import Piece from "../src/game_engine/Piece";

describe("Player Class", () => {
  let player;
  let piece;

  beforeEach(() => {
    player = new Player("test", "test");
  });

  test("new Player", () => {
    expect(player).toBeDefined();
    player.computeScore(44);
    expect(player.score).toBe(1200);
  });
  test("new Player", () => {
    piece = {
      currentRotation: 0,
      color: 7,
      shape: [
        [
          { x: 1, y: 10 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ],
      ],
    };
    player.drawNextPiece(piece);
    player.computeScore(44);
    expect(player.score).toBe(1200);
  });
});
