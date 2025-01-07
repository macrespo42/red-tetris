"use strict";
class Board {
  /**
   * @param {number} [width=10]
   * @param {number} [height=20]
   **/
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
