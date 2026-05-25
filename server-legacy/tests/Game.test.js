import Game from "../src/game_engine/Game";
import { test, expect, jest } from "@jest/globals";
import Player from "../src/game_engine/Player";
import Piece from "../src/game_engine/Piece";
import Board from "../src/game_engine/Board";

describe("Game Class", () => {
  let game;
  let player1;
  let player;
  let player2;

  beforeEach(() => {
    game = new Game("Test Game");
    player1 = new Player("test", "test");
    player2 = new Player("test1", "test1");
    player = new Player();
    player.board = new Board();
    player.isAlive = true;
    player.currentPiece = new Piece();

    // game.players.set(player.id, player);
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
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    player1.isAlive = false;
    player1.currentPiece = new Piece();
    player1.board.moveDown = jest.fn();

    game.movePiece("moveBottom", player1.id);

    expect(player1.board.moveDown).not.toHaveBeenCalled();
    expect(player1.currentPiece).not.toBeNull();
  });
  test("movePiece should move piece to the bottom", () => {
    game.addPlayer(player1);
    player1.board.rotate = jest.fn().mockReturnValue(null);
    player1.currentPiece = new Piece();
    game.startGame();
    game.movePiece("ddddd", player1.id);
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
  });

  it('should fill the queue with broken pieces in "broken_piece" mode', () => {
    game.mode = "broken_piece";
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.1);

    game.startGame();

    expect(game.pieceQueue.length).toBe(Game.QUEUE_SIZE);

    const brokenPieces = game.pieceQueue.filter((piece) => piece.color === 8);
    expect(brokenPieces.length).toBeGreaterThan(0);
  });

  test("tick should handle multiple players correctly", () => {
    const player2 = new Player();

    player2.id = "player2";
    player2.board = new Board();
    player2.isAlive = true;
    player2.currentPiece = new Piece();

    game.players.set(player2.id, player2);
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.5);
    player.board.moveDown = jest.fn().mockReturnValue(null);
    player2.board.moveDown = jest.fn().mockReturnValue(player2.currentPiece);
    game.startGame();
    game.tick();

    expect(player.isAlive).toBe(true);
    expect(player2.board.moveDown).toHaveBeenCalledWith(player2.currentPiece);
    expect(player2.isAlive).toBe(true);
  });
  test("tick should handle multiple players correctly", () => {
    const player2 = new Player();

    player2.id = "player2";
    player2.board = new Board();
    player2.isAlive = true;
    player2.currentPiece = new Piece();

    game.pieceQueue = [new Piece()];

    game.players.set(player2.id, player2);

    player.board.moveDown = jest.fn().mockReturnValue(null);
    player2.board.moveDown = jest.fn().mockReturnValue(player2.currentPiece);
    game.pieceQueue = Array(Game.QUEUE_SIZE).fill(new Piece());
    game.setGameMode("normal");
    game.startGame();
    game.tick();
    expect(player.isAlive).toBe(true);
    expect(player2.board.moveDown).toHaveBeenCalledWith(player2.currentPiece);
    expect(player2.isAlive).toBe(true);
  });
  test("#updateScores should inflict double penalty in 'sudden_death' mode", () => {
    game.setGameMode("sudden_death");
    game.pieceQueue = Array(Game.QUEUE_SIZE).fill(new Piece());
    game.addPlayer(player1);
    game.addPlayer(player2);
    player1.board.checkForFullRows = jest.fn().mockReturnValue(1);
    player1.computeScore = jest.fn();
    player2.board.inflictPenalty = jest.fn();

    game.tick();

    expect(player1.computeScore).toHaveBeenCalledWith(1);
    expect(player1.isWinner).toBe(true);
  });

  test("#updateScores should inflict double penalty in 'domination' mode", () => {
    game.setGameMode("domination");
    game.pieceQueue = Array(Game.QUEUE_SIZE).fill(new Piece());
    game.addPlayer(player1);
    game.addPlayer(player2);
    player1.board.checkForFullRows = jest.fn().mockReturnValue(1);
    player1.computeScore = jest.fn().mockReturnValue(1);

    game.tick();

    expect(player1.computeScore).toHaveBeenCalledWith(1);
  });
  test("#updateScores should inflict double penalty in 'normal' mode", () => {
    game.setGameMode("normal");
    game.pieceQueue = Array(Game.QUEUE_SIZE).fill(new Piece());
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.startGame();
    player1.board.checkForFullRows = jest.fn().mockReturnValue(2);
    player1.computeScore = jest.fn().mockReturnValue(1);

    game.tick();
    expect(player1.computeScore).toHaveBeenCalledWith(2);
  });

  test("#updateScores should inflict double penalty in 'normal' mode", () => {
    game.setGameMode("normal");
    game.pieceQueue = Array(Game.QUEUE_SIZE).fill(new Piece());
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.startGame();
    player1.board.checkForFullRows = jest.fn().mockReturnValue(2);
    player1.computeScore = jest.fn().mockReturnValue(1);

    game.tick();
    expect(player1.computeScore).toHaveBeenCalledWith(2);
  });

  test("#checkGameState should inflict double penalty in 'normal' mode", () => {
    game.setGameMode("normal");
    game.startGame();
    game.addPlayer(player1);
    player1.board.insertPiece = jest.fn().mockReturnValue(null);
    player1.board.moveDown = jest.fn().mockReturnValue(null);

    game.tick();
    expect(game.isStarted).toBe(false);
    expect(player1.isAlive).toBe(false);
  });
  test("#checkGameState should inflict double penalty in 'normal' mode", () => {
    game.setGameMode("normal");
    game.startGame();
    game.addPlayer(player1);
    game.addPlayer(player2);
    player1.board.insertPiece = jest.fn().mockReturnValue(null);
    player1.board.moveDown = jest.fn().mockReturnValue(null);

    game.tick();
  });
});
