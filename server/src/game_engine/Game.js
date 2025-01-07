"use strict";
import Piece from "./Piece.js";
// import Board from "./Board.js";

class Game {
  QUEUE_SIZE = 20;

  /**
   * @param { string } name
   **/
  constructor(name) {
    this.name = name;
    this.isStarted = false;
    this.players = [];
    this.pieceQueue = [];
  }

  #fillPieceQueue() {
    for (let i = 0; i < this.QUEUE_SIZE; i++) {
      const piece = new Piece();
      this.pieceQueue.push(piece);
    }
  }

  /**
   * @param { Player} player
   **/
  addPlayer(player) {
    // player.board = new Board();
    this.players.push(player);
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
  }
}

export default Game;
