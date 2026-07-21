from dataclasses import dataclass
from domain.entities.player import Player
from domain.entities.piece import Piece


@dataclass
class Game:
    name: str
    mode: str
    id: str
    is_started: bool
    players: dict[str, Player]
    piece_queue: list[Piece]

    def add_player(self):
        pass

    def start_game(self):
        pass

    def clear_game(self):
        pass

    def tick(self):
        pass
