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
    player_id: str
    direction: Direction


@dataclass
class MovePieceOutput:
    game: Game
    moved: bool


class MovePiece:
    def __init__(self, game_repository: IGameRepository) -> None:
        self._game_repository = game_repository

    def execute(self, input: MovePieceInput) -> MovePieceOutput:
        game = self._game_repository.get(input.game_id)
        if game is None:
            raise ValueError(f"Game {input.game_id} not found")  # TODO create custom exception

        player = game.get_player(input.player_id)
        if player is None:
            raise ValueError(f"Player {input.player_id} not found in game {input.game_id}")

        dx, dy = input.direction.value
        moved = player.try_move(dx, dy)

        if moved:
            self._game_repository.save(game)

        return MovePieceOutput(game=game, moved=moved)
