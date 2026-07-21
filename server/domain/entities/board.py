from dataclasses import dataclass
from domain.entities.piece import Piece


@dataclass
class Board:
    width: int
    height: int
    next_piece_index: int
    current_penalty: int
    grid: list[list[int]]

    def insert_piece(self, piece: Piece):
        pass

    def init_grid(self):
        pass

    def draw(self):
        pass

    def undraw(self):
        pass
