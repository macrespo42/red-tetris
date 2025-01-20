"use strict";

class Board {
  /**
   * @param {number} width=10
   * @param {number} height=20
   **/
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.nextPieceIndex = 0;
    this.currentPenalty = 0;
    this.#initGrid();
  }

  #initGrid() {
    this.grid = [];
    this.grid = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(0));
  }

  /**
   * @param {Piece} piece
   * @param {number} offset
   * @param {string} direction
   * @returns {Array}
   **/
  #applyOffset(piece, offset, direction) {
    for (let i = 0; i < piece.shape.length; i++) {
      piece.shape[i] = piece.shape[i].map((position) => ({
        x: direction === "vertical" ? position.x + offset : position.x,
        y: direction === "horizontal" ? position.y + offset : position.y,
      }));
    }
    return piece.shape;
  }

  /**
   * @param {Piece} [piece]
   * @returns {Piece || null}
   **/
  insertPiece(piece) {
    const offset = Math.floor((this.width - 1) / 2) - 1;
    let collision = false;

    piece.shape = this.#applyOffset(piece, offset, "horizontal");

    piece.shape[piece.currentRotation].forEach((position) => {
      if (this.grid[position.x][position.y] > 0) {
        collision = true;
      }
    });

    if (collision) return null;

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    return piece;
  }

  /**
   * @returns {number}
   **/
  checkForFullRows() {
    let n = 0;
    const fullRowsIndex = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i].some((cell) => cell === 0 || cell === 8)) {
        fullRowsIndex.push(i);
      }
    }
    for (const i of fullRowsIndex) {
      this.grid.splice(i, 1);
      this.grid.unshift(Array(this.width).fill(0));
      n += 1;
    }
    return n;
  }

  /**
   * @param {number} n
   **/
  inflictPenalty(n) {
    let n_penalty = n;
    while (n_penalty > 0) {
      this.grid[this.grid.length - (n_penalty + this.currentPenalty)].fill(8);
      n_penalty--;
    }
    this.currentPenalty += n;
  }

  /**
   * @param {Piece} piece
   * @returns {(Piece|null)}
   **/
  moveDown(piece) {
    if (!piece) {
      return null;
    }
    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation].forEach((position) => {
      const newX = position.x + 1;
      const newY = position.y;

      if (
        newX >= this.height ||
        (this.grid[newX][newY] > 0 && !piece.isInPiece(newX, newY))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) {
      this.nextPieceIndex++;
      return null;
    }

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    piece.shape = this.#applyOffset(piece, 1, "vertical");

    return piece;
  }

  /**
   * @param {Piece} piece
   * @returns {(Piece|null)}
   **/
  moveHorizontally(piece, direction) {
    if (!piece) {
      return piece;
    }
    const offset = direction === "right" ? 1 : -1;
    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation].map((position) => ({
      x: position.x,
      y: position.y,
    }));

    piece.shape[piece.currentRotation].forEach((position) => {
      const newX = position.x;
      const newY = position.y + offset;

      if (
        newY < 0 ||
        newY >= this.width ||
        (this.grid[newX][newY] > 0 && !piece.isInPiece(newX, newY))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) return piece;

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    piece.shape = this.#applyOffset(piece, offset, "horizontal");
    return piece;
  }

  /**
   * @param {Piece} piece
   * @returns {(Piece|null)}
   **/
  rotate(piece) {
    if (!piece) {
      return null;
    }

    let collision = false;

    piece.nextRotation();

    piece.shape[piece.currentRotation].forEach((position) => {
      if (position.x < 0 || position.x >= this.height) {
        console.log("Collision spotted on x");
        collision = true;
      } else if (position.y >= this.width || position.y < 0) {
        console.log("Collision spotted on y!");
        collision = true;
      } else if (
        this.grid[position.x][position.y] > 0 &&
        !piece.isInPiece(position.x, position.y)
      ) {
        console.log("Collision spotted mama");
        collision = true;
      }
    });

    if (collision) {
      piece.previousRotation();
      return piece;
    }

    piece.previousRotation();
    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    piece.nextRotation();
    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });
    return piece;
  }
}

export default Board;
