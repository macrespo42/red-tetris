import { describe, it, expect, } from "vitest";
import { render, } from "@testing-library/react";
import {  useNavigate } from "react-router";
import { Provider } from "react-redux";
import { socket } from "../socket";
import RoomView from "../components/RoomView";
import { vi} from "vitest";
import SocketMiddleware from "../components/SocketMiddleware";
import { waitFor } from "@testing-library/react";
import store from "../store";

describe("RoomViewSocketNavigate", () => {
  vi.mock("../socket", () => ({
    socket: {
      on: vi.fn(),
      off: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn(),
      id: "test-socket-id",
    },
  }));
  vi.mock("react-router", () => ({
    ...vi.importActual("react-router"),
    useNavigate: vi.fn(),
    useParams: () => ({ room: "testRoom", player: "testPlayer" }),
    Routes: () => vi.fn(),
    Route: () => vi.fn(),
    MemoryRouter: vi.fn(),
  }));
  it("should navigate to game page when game started", async () => {
    const navigate = vi.fn(); 
    useNavigate.mockReturnValue(navigate); 
     render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>
    );

    const mockPlayers = [
      { id: "fake-socket-id", name: "Player 1", isGameOwner: true },
      { id: "player-2", name: "Player 4", isGameOwner: false },
    ];

    const playersListCall = vi.mocked(socket.on).mock.calls.find(([event]) => event === "players list");
    const onConnectCallback = playersListCall[1];
    onConnectCallback(mockPlayers);

    const onGameStarted = socket.on.mock.calls.find(([event]) => event === "game started")[1];
    onGameStarted();
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/testRoom/testPlayer");
    });
  });
});
