from tests.fakes import FakeGameRepository
from use_cases.move_piece import Direction, MovePiece, MovePieceInput, MovePieceOutput


def test_move_piece_left_should_move_piece_left_when_possible():
    move_piece_input = MovePieceInput(
        game_id="42", player_id="4242", direction=Direction.LEFT
    )
    repo = FakeGameRepository()

    use_case = MovePiece(game_repository=repo)

    result: MovePieceOutput = use_case.execute(input=move_piece_input)

    assert result.game.id == "42"
    assert result.moved
    assert repo.game is result.game


def test_move_piece_right_should_move_piece_right_when_possible():
    move_piece_input = MovePieceInput(
        game_id="42", player_id="4242", direction=Direction.RIGHT
    )
    repo = FakeGameRepository()

    use_case = MovePiece(game_repository=repo)

    result: MovePieceOutput = use_case.execute(input=move_piece_input)

    assert result.game.id == "42"
    assert result.moved
    assert repo.saved


def test_move_piece_left_should_not_move_when_blocked_by_left_wall():
    move_piece_input = MovePieceInput(
        game_id="42", player_id="4242", direction=Direction.LEFT
    )
    repo = FakeGameRepository(piece_x=0)

    use_case = MovePiece(game_repository=repo)

    result: MovePieceOutput = use_case.execute(input=move_piece_input)

    assert not result.moved
    assert not repo.saved


def test_move_piece_right_should_not_move_when_blocked_by_right_wall():
    move_piece_input = MovePieceInput(
        game_id="42", player_id="4242", direction=Direction.RIGHT
    )
    repo = FakeGameRepository(piece_x=7)

    use_case = MovePiece(game_repository=repo)

    result: MovePieceOutput = use_case.execute(input=move_piece_input)

    assert not result.moved
    assert not repo.saved
