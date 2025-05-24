type position = {
  x: number;
  y: number;
};

class Piece {
  color: number;
  shape: position[][];
  currentRotation: number;
  static O = [
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
  ];

  static S = [
    [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  ];

  static Z = [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
  ];

  static T = [
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  ];

  static L = [
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  ];

  static J = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  ];

  static I = [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
  ];

  constructor(type: string = "random") {
    this.shape = [...Piece.O];
    this.color = 0;
    this.currentRotation = 0;

    if (type !== "random") {
      if (type == "0") {
        this.shape = [...Piece.O];
        this.color = 1;
      }
      if (type == "S") {
        this.shape = [...Piece.S];
        this.color = 2;
      }
      if (type == "Z") {
        this.shape = [...Piece.Z];
        this.color = 3;
      }
      if (type == "T") {
        this.shape = [...Piece.T];
        this.color = 4;
      }
      if (type == "L") {
        this.shape = [...Piece.L];
        this.color = 5;
      }
      if (type == "J") {
        this.shape = [...Piece.J];
        this.color = 6;
      }
      if (type == "I") {
        this.shape = [...Piece.I];
        this.color = 7;
      }
    } else {
      const shapes = [
        Piece.O,
        Piece.S,
        Piece.Z,
        Piece.T,
        Piece.L,
        Piece.J,
        Piece.I,
      ];
      const randomIndex = Math.floor(Math.random() * shapes.length);
      this.shape = [...(shapes[randomIndex] ?? [])];
      this.color = randomIndex + 1;
      this.currentRotation = 0;
    }
  }

  clone(): Piece {
    const piece = new Piece();
    piece.shape = [...this.shape];
    piece.color = this.color;
    piece.currentRotation = this.currentRotation;
    return piece;
  }

  isInPiece(x: number, y: number): boolean {
    return (
      this.shape[this.currentRotation]?.some(
        (position) => position.x === x && position.y === y
      ) || false
    );
  }

  nextRotation() {
    this.currentRotation++;
    if (this.currentRotation > this.shape.length - 1) {
      this.currentRotation = 0;
    }
  }

  previousRotation() {
    this.currentRotation--;
    if (this.currentRotation < 0) {
      this.currentRotation = this.shape.length - 1;
    }
  }
}

export default Piece;
