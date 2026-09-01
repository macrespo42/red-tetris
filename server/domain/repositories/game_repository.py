from abc import ABC, abstractmethod
from domain.entities.game import Game


class IGameRepository(ABC):
    @abstractmethod
    def get(self, game_id: str) -> Game | None:
        pass

    @abstractmethod
    def save(self, game: Game) -> None:
        pass
