import Piece from "./Piece";

class Game {
  QUEUE_SIZE = 20;
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.isStarted = false;
    this.players = [];
    this.pieceQueue = [];
    this.#initBoard();
  }

  #initBoard() {
    this.board = [];
    for (let i = 0; i < this.height; i++) {
      const arr = Array(this.width).fill(0);
      this.board.push(arr);
    }
  }

  #fillPieceQueue() {
    for (let i = 0; i < this.QUEUE_SIZE; i++) {
      const piece = new Piece();
      this.pieceQueue.push(piece);
    }
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
  }
}

export default Game;
