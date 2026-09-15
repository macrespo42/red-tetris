from domain.entities.player import Player
from domain.entities.piece import Piece, PieceType
from domain.entities.board import Board
from domain.entities.game import Game
from domain.repositories.game_repository import IGameRepository


class FakeGameRepository(IGameRepository):
    def __init__(self) -> None:
        super().__init__()
        self.game = None

    def get(self, game_id: str) -> Game | None:
        game = Game(
            id=game_id,
            players=[
                Player(
                    name="Rambo",
                    id="4242",
                    is_game_owner=True,
                    board=Board(width=10, height=20, grid=[[0] * 10 for _ in range(20)]),
                    current_piece=Piece(PieceType.T, x=0, y=0, rotation=0),
                    is_alive=True,
                    is_winner=False,
                    score=42,
                    next_piece_index=12,
                )
            ],
        )
        return game

    def save(self, game: Game) -> None:
        self.game = game
