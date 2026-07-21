from dataclasses import dataclass


@dataclass(frozen=True)
class orthogonal_position:
    y: int
    x: int


@dataclass(frozen=True)
class Shape:
    line: list[orthogonal_position]


@dataclass
class Piece:
    shapes: list[Shape]
    color: int
    current_rotation: int = 0

    def rot90(self):
        pass

    def move_down(self):
        pass

    def move_horizontally(self):
        pass
