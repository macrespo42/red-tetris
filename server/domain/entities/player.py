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
    next_piece_index: int

    def try_move(self, dx: int, dy: int) -> bool:
        candidate = self.current_piece.moved(dx, dy)
        if self.board.can_place(candidate):
            self.current_piece = candidate
            return True
        return False

    def try_rotate(self, clockwise: bool = True) -> bool:
        candidate = self.current_piece.rotated(clockwise)
        if self.board.can_place(candidate):
            self.current_piece = candidate
            return True
        # TODO implement SRS
        return False

    def soft_drop_or_insert(self) -> None:
        candidate = self.current_piece.moved(0, 1)
        if self.board.can_place(candidate):
            self.current_piece = candidate
        else:
            self.board.draw_piece(self.current_piece)
            self.board.clear_full_lines()
            # TODO spawn next piece...

    def compute_score(self, lines: int):
        pass

    def reset(self):
        pass
