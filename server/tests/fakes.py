from domain.entities.board import Board
from domain.entities.game import Game
from domain.entities.piece import Piece, PieceType
from domain.entities.player import Player
from domain.repositories.game_repository import IGameRepository


class FakeGameRepository(IGameRepository):
    def __init__(self, piece_x: int = 4) -> None:
        super().__init__()
        self.saved = False
        self._piece_x = piece_x
        self.game = Game(
            id="42",
            players=[
                Player(
                    name="Toto",
                    id="4242",
                    is_game_owner=True,
                    board=Board(
                        width=10, height=20, grid=[[0] * 10 for _ in range(20)]
                    ),
                    current_piece=Piece(PieceType.T, x=self._piece_x, y=0, rotation=0),
                    is_alive=True,
                    is_winner=False,
                    score=42,
                    next_piece_index=12,
                ),
                Player(
                    name="Titi",
                    id="4243",
                    is_game_owner=True,
                    board=Board(
                        width=10, height=20, grid=[[0] * 10 for _ in range(20)]
                    ),
                    current_piece=Piece(PieceType.T, x=self._piece_x, y=0, rotation=0),
                    is_alive=True,
                    is_winner=False,
                    score=420,
                    next_piece_index=120,
                ),
            ],
        )

    def get(self, game_id: str) -> Game | None:
        return self.game

    def save(self, game: Game) -> None:
        self.saved = True
