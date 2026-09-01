from domain.entities.board import Board
from domain.entities.piece import Piece
from domain.entities.player import Player


class Game:
    board: Board
    current_piece: Piece
    players: list[Player]

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
