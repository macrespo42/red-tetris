from dataclasses import dataclass

from domain.entities.player import Player


@dataclass
class Game:
    id: str
    players: list[Player]

    def get_player(self, player_id: str) -> Player | None:
        return next((p for p in self.players if p.id == player_id), None)

    @property
    def alive_players(self) -> list[Player]:
        return [p for p in self.players if p.is_alive]

    @property
    def winner(self) -> Player | None:
        alive = self.alive_players
        return alive[0] if len(alive) == 1 else None
