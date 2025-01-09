"use strict";
import Piece from "./Piece.js";
import Board from "./Board.js";

class Game {
  QUEUE_SIZE = 4096;

  /**
   * @param { string } name
   **/
  constructor(name) {
    this.name = name;
    this.isStarted = false;
    this.players = new Map();
    this.pieceQueue = [];
  }

  #fillPieceQueue() {
    for (let i = 0; i < this.QUEUE_SIZE; i++) {
      const piece = new Piece("I");
      this.pieceQueue.push(piece);
    }
  }

  /**
   * @param { Player} player
   **/
  addPlayer(newPlayer) {
    newPlayer.board = new Board();
    this.players.set(newPlayer.id, newPlayer);
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
    this.players.forEach((player) => {
      player.board.insertPiece(this.pieceQueue[player.board.nextPieceIndex]);
    });
  }
}

export default Game;
