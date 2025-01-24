import { describe, it, expect, test, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { socket } from "../socket";
import RoomView from "../components/RoomView";
import { vi, beforeEach } from "vitest";
import SocketMiddleware from "../components/SocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../playerSlice";
import { waitFor } from "@testing-library/react";

describe("room view", () => {
  let store;

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
    useNavigate: () => vi.fn(),
    useParams: () => ({ room: "testRoom", player: "testPlayer" }),
    Routes: () => vi.fn(),
    Route: () => vi.fn(),
    MemoryRouter: () => vi.fn(),
  }));
  beforeEach(() => {
    store = configureStore({
      reducer: {
        player: playerReducer,
      },
      preloadedState: {
        player: {
          value: {
            socketId: "fake-socket-id",
            name: "fake-name",
            roomName: "fake-room-name",
            isGameOwner: true,
          },
        },
      },
    });
    store.dispatch = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("socket on dispatch", async () => {
    const { rerender } = render(
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
    const onConnectCallback = socket.on.mock.calls.find(([event]) => event === "players list")[1];
    onConnectCallback(mockPlayers);
    rerender(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>
    );

      expect(screen.getByText(/testRoom/i)).toBeDefined();
      expect(screen.getByText(/Player 1/i)).toBeDefined();
  });
  it("should emit 'start game' when startGame is called by game owner", async () => {
    render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>
    );
    fireEvent.click(screen.getByText(/START/i));
    await waitFor(() => {
      expect(socket.emit).toHaveBeenCalledWith("start game", { room: "testRoom" });
    });
  });

});
