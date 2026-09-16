from dataclasses import dataclass

from domain.entities.game import Game
from domain.repositories.game_repository import IGameRepository


@dataclass
class SoftDropInput:
    game_id: str
    player_id: str


@dataclass
class SoftDropOutput:
    game: Game
    moved: bool


class SoftDropPiece:
    def __init__(self, game_repository: IGameRepository):
        self._game_repository = game_repository

    def execute(self, input: SoftDropInput) -> SoftDropOutput:
        game = self._game_repository.get(input.game_id)
        if game is None:
            raise ValueError(
                f"Game {input.game_id} not found"
            )  # TODO create custom exception

        player = game.get_player(input.player_id)
        if player is None:
            raise ValueError(
                f"Player {input.player_id} not found in game {input.game_id}"
            )

        dx, dy = (0, 1)
        moved = player.try_move(dx, dy)

        if moved:
            self._game_repository.save(game)

        return SoftDropOutput(game=game, moved=moved)
