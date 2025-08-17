import Piece from "./Piece.js";

class Board {
  width: number;
  height: number;
  nextPieceIndex: number;
  currentPenalty: number;
  grid: number[][];

  constructor(width: number = 10, height: number = 20) {
    this.width = width;
    this.height = height;
    this.nextPieceIndex = 0;
    this.currentPenalty = 0;
    this.grid = [];
    this.initGrid();
  }

  insertPiece(piece: Piece): Piece | null {
    const offset = Math.floor((this.width - 1) / 2) - 1;
    let collision = false;

    piece.shape = this.#applyOffset(piece, offset, "horizontal");

    piece.shape[piece.currentRotation]?.forEach((position) => {
      if (this.grid[position.x]?.[position.y] ?? 0 > 0) {
        collision = true;
      }
    });

    if (collision) {
      return null;
    }

    this.#draw(piece);

    return piece;
  }

  moveDown(piece: Piece | null): Piece | null {
    if (!piece) {
      return null;
    }

    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation]?.forEach((position) => {
      const newX = position.x + 1;
      const newY = position.y;

      const nextPiecePosition = this.grid[newX]?.[newY] ?? 0;
      if (
        newX >= this.height ||
        (nextPiecePosition > 0 && !piece.isInPiece(newX, newY))
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

    this.#undraw(piece);
    piece.shape = this.#applyOffset(piece, 1, "vertical");
    this.#draw(piece);

    return piece;
  }

  moveHorizontally(piece: Piece | null, direction: string): Piece | null {
    if (!piece) return piece;

    const offset = direction === "right" ? 1 : -1;
    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation]?.map((position) => ({
      x: position.x,
      y: position.y,
    }));

    piece.shape[piece.currentRotation]?.forEach((position) => {
      const newX = position.x;
      const newY = position.y + offset;

      const nextPiecePosition = this.grid[newX]?.[newY] ?? 0;

      if (
        newY < 0 ||
        newY >= this.width ||
        (nextPiecePosition > 0 && !piece.isInPiece(newX, newY))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) return piece;

    this.#undraw(piece);

    piece.shape = this.#applyOffset(piece, offset, "horizontal");

    this.#draw(piece);
    return piece;
  }

  rotate(piece: Piece | null): Piece | null {
    if (!piece) return null;
    let collision = false;

    piece.nextRotation();
    piece.shape[piece.currentRotation]?.forEach((position) => {
      const nextPiecePosition = this.grid[position.x]?.[position.y] ?? 0;
      if (
        position.x < 0 ||
        position.x >= this.height ||
        position.y >= this.width ||
        position.y < 0 ||
        (nextPiecePosition > 0 && !piece.isInPiece(position.x, position.y))
      ) {
        collision = true;
      }
    });

    if (collision) {
      piece.previousRotation();
      return piece;
    }

    piece.previousRotation();
    this.#undraw(piece);

    piece.nextRotation();
    this.#draw(piece);

    return piece;
  }

  checkForFullRows(): number {
    let n = 0;
    const fullRowsIndex = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i]?.some((cell) => cell === 0 || cell === 8)) {
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

  inflictPenalty(n: number) {
    let n_penalty = n - 1;
    while (n_penalty > 0) {
      this.grid[this.grid.length - (n_penalty + this.currentPenalty)]?.fill(8);
      n_penalty--;
    }
    this.currentPenalty += n;
  }

  initGrid() {
    this.grid = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(0));
  }

  #applyOffset(piece: Piece, offset: number, direction: string) {
    for (let i = 0; i < piece.shape.length; i++) {
      const currentShape = piece.shape[i];
      if (currentShape) {
        piece.shape[i] = currentShape.map((position) => ({
          x: direction === "vertical" ? position.x + offset : position.x,
          y: direction === "horizontal" ? position.y + offset : position.y,
        }));
      }
    }
    return piece.shape;
  }

  #draw(piece: Piece) {
    piece.shape[piece.currentRotation]?.forEach((position) => {
      this.grid[position.x]![position.y] = piece.color;
    });
  }

  #undraw(piece: Piece) {
    piece.shape[piece.currentRotation]?.forEach((position) => {
      this.grid[position.x]![position.y] = 0;
    });
  }
}

export default Board;
