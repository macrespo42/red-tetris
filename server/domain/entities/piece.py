from dataclasses import dataclass


@dataclass(frozen=True)
class orthogonal_position:
    y: int
    x: int


@dataclass(frozen=True)
class Shape:
    line: list[orthogonal_position]


class Piece:
    shapes: list[Shape]
    color: int
    current_rotation: int = 0

    def rotate_counterclockwise(self):
        self.current_rotation -= 1
        if self.current_rotation < 0:
            self.current_rotation = len(self.shapes) - 1

    def rotate_clockwise(self):
        self.current_rotation += 1
        if self.current_rotation > len(self.shapes) - 1:
            self.current_rotation = 0
