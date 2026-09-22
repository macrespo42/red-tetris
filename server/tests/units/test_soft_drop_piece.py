from unittest.mock import patch

from domain.entities.player import Player
from tests.fakes import FakeGameRepository
from use_cases.soft_drop_piece import SoftDropInput, SoftDropOutput, SoftDropPiece


def test_drop_piece_should_drop_when_space_available():
    input = SoftDropInput(game_id="42", player_id="4242")
    repo = FakeGameRepository()

    use_case = SoftDropPiece(game_repository=repo)

    result: SoftDropOutput = use_case.execute(input=input)

    assert result.game.id == "42"
    assert result.moved
    assert repo.saved


def test_drop_piece_should_not_drop_when_space_unavailable():
    input = SoftDropInput(game_id="42", player_id="4242")
    repo = FakeGameRepository()

    with patch.object(Player, "try_move", return_value=False):
        use_case = SoftDropPiece(game_repository=repo)

        result = use_case.execute(input)

    assert result.game.id == "42"
    assert not result.moved
    assert not repo.saved
