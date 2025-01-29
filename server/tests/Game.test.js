import Game from "../src/game_engine/Game";
import { test, expect, jest } from "@jest/globals";
import Player from "../src/game_engine/Player";
import Piece from "../src/game_engine/Piece";

describe("Game Class", () => {
  let game;
  let player1;
  let player2;

  beforeEach(() => {
    game = new Game("Test Game");
    player1 = new Player("test", "test");
    player2 = new Player("test1", "test1");
  });

  test("new Game", () => {
    expect(game).toBeDefined();
  });

  test("add player", () => {
    game.addPlayer(player1);
    expect(game.players.size).toBe(1);
    expect(game.players.get("test").board).toBeDefined();
  });

  test("start game", () => {
    game.startGame();
    expect(game.isStarted).toBe(true);
  });

  test("clear game", () => {
    game.addPlayer(player1);
    expect(game.players.size).toBe(1);
    game.startGame();
    game.players.get("test").computeScore(1);
    expect(game.players.get("test").score).toEqual(40);
    game.clearGame();
    expect(game.players.get("test").score).toEqual(0);
  });

  test("tick", () => {
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.startGame();
    game.players.get("test").isAlive = false;
    game.tick();
    expect(game.players.get("test1").currentPiece).not.toBe(null);
    expect(game.players.get("test1").isWinner).toBe(true);
    expect(game.players.get("test").isAlive).toBe(false);
    expect(game.isStarted).toBe(false);
  });
  test("tick", () => {
    game.addPlayer(player1);
    game.startGame();
    game.players.get("test").currentPiece = null;
    game.tick();
    expect(game.isStarted).toBe(true);
  });
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("moveLeft", player1.id);
  });
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("moveRight", player1.id);
  });
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("moveBottom", player1.id);
  });
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("moveDown", player1.id);
  });
  test("move piece isAlive false", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.players.get("test").isAlive = false;
    expect(game.movePiece("rotate", player1.id)).toBe(undefined);
  });
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("rotate", player1.id);
  });
  test("set game mode", () => {
    game.setGameMode("test");
    expect(game.mode).toBe("test");
  });
  test("start game fill piece queue", () => {
    game.addPlayer(player1);
    game.startGame();
    expect(game.pieceQueue.length).toBe(4096);
  });

  it('should fill the queue with broken pieces in "broken_piece" mode', () => {
    game.mode = "broken_piece";
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1);

    game.startGame();

    expect(game.pieceQueue.length).toBe(Game.QUEUE_SIZE);

    const brokenPieces = game.pieceQueue.filter((piece) => piece.color === 8);
    expect(brokenPieces.length).toBeGreaterThan(0);
    expect(brokenPieces.length).toBeLessThanOrEqual(Game.QUEUE_SIZE * 0.2);
  });

  it('should fill the queue with broken pieces in "broken_piece" mode', () => {
    game.mode = "broken_piece";
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1);

    game.startGame();

    expect(game.pieceQueue.length).toBe(Game.QUEUE_SIZE);

    const brokenPieces = game.pieceQueue.filter((piece) => piece.color === 8);
    expect(brokenPieces.length).toBeGreaterThan(0);
    expect(brokenPieces.length).toBeLessThanOrEqual(Game.QUEUE_SIZE * 0.2);
  });
  it('should shuffle the queue when it is full and mode is not "broken_piece"', () => {
    game.mode = "normal";

    for (let i = 0; i < Game.QUEUE_SIZE; i++) {
      game.pieceQueue.push(new Piece());
    }

    const originalQueue = [...game.pieceQueue];

    jest.spyOn(global.Math, "random").mockImplementation(() => 0.5);

    game.startGame();

    expect(game.pieceQueue.length).toBe(Game.QUEUE_SIZE);
    expect(game.pieceQueue).not.toEqual(originalQueue);
  });
});
