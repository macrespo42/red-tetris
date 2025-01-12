"use strict";
class Piece {
  static O = [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  ];

  static S = [
    [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ],
  ];

  static Z = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  static T = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];

  static L = [
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];

  static J = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ];

  static I = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ];

  /**
   * @param {string} [type="random"]
   **/
  constructor(type = "random") {
    if (type !== "random") {
      if (type == "0") this.shape = [...Piece.O];
      if (type == "S") this.shape = [...Piece.S];
      if (type == "Z") this.shape = [...Piece.Z];
      if (type == "T") this.shape = [...Piece.T];
      if (type == "L") this.shape = [...Piece.L];
      if (type == "J") this.shape = [...Piece.J];
      if (type == "I") this.shape = [...Piece.I];
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
      this.shape = [...shapes[Math.floor(Math.random() * shapes.length)]];
    }
  }
}

export default Piece;
