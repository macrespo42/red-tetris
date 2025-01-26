import Game from "../src/game_engine/Game";
import { test, expect } from "@jest/globals";
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
    // expect(game.players.get("test").isAlive).toBe(false);
    expect(game.isStarted).toBe(false);
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
  test("move piece", () => {
    game.addPlayer(player1);
    game.startGame();
    game.tick();
    game.movePiece("rotate", player1.id);
  });
});
