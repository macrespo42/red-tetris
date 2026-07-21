from dataclasses import dataclass
from domain.entities.board import Board
from domain.entities.piece import Piece


@dataclass
class Player:
    name: str
    id: str
    is_game_owner: bool
    board: Board
    current_piece: Piece
    is_alive: bool
    is_winner: bool
    score: int
    next_piece_grid: list[list[int]]

    def init_grid(self):
        pass

    def compute_score(self, lines: int):
        pass

    def reset(self):
        pass
