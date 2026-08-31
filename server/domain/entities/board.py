from dataclasses import dataclass
from domain.entities.piece import Piece


@dataclass
class Board:
    width: int
    height: int
    grid: list[list[int]]

    def create_empty_board(self) -> None:
        for i in range(0, self.height):
            for j in range(0, self.width):
                self.grid[i][j] = 0

    def is_cell_occupied(self, x: int, y: int) -> bool:
        return self.grid[y][x] != 0

    def is_within_bounds(self, x: int, y: int) -> bool:
        return (x > 0 and x <= self.width) and (y > 0 and y <= self.height)

    def can_place(self, piece: Piece) -> bool:
        return all(
            self.is_within_bounds(x, y) and not self.is_cell_occupied(x, y)
            for x, y in piece.occupied_cells()
        )

    def draw_piece(self, piece: Piece):
        for x, y in piece.occupied_cells():
            self.grid[y][x] = piece.type

    def is_game_over(self, piece: Piece) -> bool:
        return not self.can_place(piece)

    def clear_full_lines(self) -> int:
        full_lines = 0
        for line_n, line in enumerate(self.grid):
            full_row = [x for x in line if x > 0]
            if len(full_row) == self.width:
                del self.grid[line_n]
                full_lines += 1
                self.grid.insert(0, [0] * self.width)
        return full_lines
