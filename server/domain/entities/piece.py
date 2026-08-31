from dataclasses import dataclass
from enum import IntEnum


class PieceType(IntEnum):
    I = 1  # noqa: E741
    O = 2  # noqa: E741
    T = 3
    S = 4
    Z = 5
    J = 6
    L = 7


# Coordonnées relatives (x, y) pour chaque type, pour les 4 états de rotation (0, R, 2, L)
# Format simplifié inspiré du Super Rotation System (SRS)
SHAPES: dict[PieceType, list[list[tuple[int, int]]]] = {
    PieceType.O: [
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
    ],
    PieceType.I: [
        [(0, 1), (1, 1), (2, 1), (3, 1)],
        [(2, 0), (2, 1), (2, 2), (2, 3)],
        [(0, 2), (1, 2), (2, 2), (3, 2)],
        [(1, 0), (1, 1), (1, 2), (1, 3)],
    ],
    PieceType.T: [
        [(1, 0), (0, 1), (1, 1), (2, 1)],
        [(1, 0), (1, 1), (2, 1), (1, 2)],
        [(0, 1), (1, 1), (2, 1), (1, 2)],
        [(1, 0), (0, 1), (1, 1), (1, 2)],
    ],
    PieceType.S: [
        [(0, 1), (0, 2), (1, 0), (1, 1)],
        [(0, 1), (1, 1), (1, 2), (2, 2)],
        [(1, 1), (1, 2), (2, 0), (2, 1)],
        [(0, 0), (1, 0), (1, 1), (2, 1)],
    ],
    PieceType.Z: [
        [(0, 0), (0, 1), (1, 1), (1, 2)],
        [(0, 2), (1, 1), (1, 2), (2, 1)],
        [(1, 0), (1, 1), (2, 1), (2, 2)],
        [(0, 1), (1, 0), (1, 1), (2, 0)],
    ],
    PieceType.J: [
        [(0, 0), (1, 0), (1, 1), (1, 2)],
        [(0, 1), (0, 2), (1, 1), (2, 1)],
        [(1, 0), (1, 1), (1, 2), (2, 2)],
        [(2, 0), (0, 1), (1, 1), (2, 1)],
    ],
    PieceType.L: [
        [(1, 0), (1, 1), (1, 2), (0, 2)],
        [(0, 1), (1, 1), (2, 1), (2, 2)],
        [(1, 0), (1, 1), (1, 2), (2, 0)],
        [(0, 0), (0, 1), (1, 1), (2, 1)],
    ],
}


@dataclass
class Piece:
    type: PieceType
    x: int
    y: int
    rotation: int = 0

    def occupied_cells(self) -> list[tuple[int, int]]:
        shape = SHAPES[self.type][self.rotation]
        return [(self.x + dx, self.y + dy) for dx, dy in shape]

    def moved(self, dx: int, dy: int) -> "Piece":
        return Piece(
            type=self.type, x=self.x + dx, y=self.y + dy, rotation=self.rotation
        )

    def rotated(self, clockwise: bool = True) -> "Piece":
        new_rotation = (self.rotation + (1 if clockwise else -1)) % 4
        return Piece(type=self.type, x=self.x, y=self.y, rotation=new_rotation)
