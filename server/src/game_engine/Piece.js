"use strict";
class Piece {
  static O = [
    [1, 1],
    [1, 1],
  ];

  static S = [
    [0, 1, 1],
    [1, 1, 0],
  ];

  static Z = [
    [1, 1, 0],
    [0, 1, 1],
  ];

  static T = [
    [0, 1, 0],
    [1, 1, 1],
  ];

  static L = [
    [0, 0, 1],
    [1, 1, 1],
  ];

  static J = [
    [1, 0, 0],
    [1, 1, 1],
  ];

  static I = [[1, 1, 1, 1]];

  /**
   * @param {string} [type="random"]
   **/
  constructor(type = "random") {
    if (type) {
      if (type == "0") this.shape = [...Piece.O];
      if (type == "S") this.shape = [...Piece.S];
      if (type == "Z") this.shape = [...Piece.Z];
      if (type == "T") this.shape = [...Piece.T];
      if (type == "L") this.shape = [...Piece.L];
      if (type == "J") this.shape = [...Piece.J];
      if (type == "I") this.shape = [...Piece.I];
    } else if (type == "random") {
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
