from dataclasses import dataclass

from domain.entities.game import Game
from domain.repositories.game_repository import IGameRepository


@dataclass
class HardDropInput:
    game_id: str
    player_id: str


@dataclass
class HardDropOutput:
    game: Game
    moved: bool


class HardDropPiece:
    def __init__(self, game_repository: IGameRepository):
        self._game_repository = game_repository

    def execute(self, input: HardDropInput) -> HardDropOutput:
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

        while True:
            moved = player.try_move(dx, dy)
            if not moved:
                break
            self._game_repository.save(game)

        return HardDropOutput(game=game, moved=moved)
