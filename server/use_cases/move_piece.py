from dataclasses import dataclass
from enum import Enum

from domain.entities.game import Game
from domain.repositories.game_repository import IGameRepository


class Direction(Enum):
    LEFT = (-1, 0)
    RIGHT = (1, 0)


@dataclass
class MovePieceInput:
    game_id: str
    direction: Direction


@dataclass
class MoviePieceOutput:
    game: Game
    moved: bool


class MovePiece:
    def __init__(self, game_repository: IGameRepository) -> None:
        self._game_repository = game_repository

    def execute(self, input: MovePieceInput):
        game = self._game_repository.get(input.game_id)
        if game is None:
            raise ValueError(
                f"Game {input.game_id} not found"
            )  # TODO create custom exception

        dx, dy = input.direction.value
        candidate_piece = game.current_piece.moved(dx, dy)

        if not game.board.can_place(candidate_piece):
            return MoviePieceOutput(game=game, moved=False)

        game.current_piece = candidate_piece
        self._game_repository.save(game)

        return MoviePieceOutput(game=game, moved=True)
