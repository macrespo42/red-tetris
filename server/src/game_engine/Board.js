class Board {
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.#initBoard();
  }

  #initBoard() {
    this.board = [];
    this.board = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(0));
  }
}

export default Board;
