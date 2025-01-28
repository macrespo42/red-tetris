import { describe, it, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router";
import { Provider } from "react-redux";
import GameView from "../components/GameView";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../playerSlice";
import SocketMiddleware from "../components/SocketMiddleware";
import { socket } from "../socket";
import userEvent from "@testing-library/user-event";

describe("Gameview", () => {

  vi.mock("react-confetti", () => ({
    __esModule: true,
    default: () => <div testid="confetti" />,
  }));
  vi.mock("../socket", () => ({
    socket: {
      on: vi.fn(),
      off: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn(),
      id: "fake-socket-id",
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
  let store;
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
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("render text", () => {
    const home = render(
      <Provider store={store}>
        <GameView />
      </Provider>
    );
    expect(screen.getAllByText(/Next piece:/i)).toBeDefined();
    expect(screen.getByText(/Controls:/i)).toBeDefined();
    home.unmount();
  });

  it("confetti test", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
       const { rerender } = render(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );
        const players = [
      {
        id: "fake-socket-id",
        board: {
          grid: [
            [1, 0],
            [0, 1],
          ],
        },
        nextPieceGrid: [
          [0, 1],
          [1, 0],
        ],
        isWinner: true,
        isAlive: true,
      },
      {
        id: "otherPlayer",
        board: {
          grid: [
            [0, 0],
            [0, 0],
          ],
        },
        nextPieceGrid: [
          [0, 0],
          [0, 0],
        ],
        isWinner: false,
        isAlive: false,
      },
    ];
        const onConnectCallback = vi.mocked(socket.on).mock.calls.find(([event]) => event === "game state")[1];
    onConnectCallback(players);
    rerender(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );


    const user = userEvent.setup();
    await user.click(screen.getByText(/PLAY AGAIN/i));
    // home.unmount();
  });  
  it("leave room", async () => {
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
            isGameOwner: false,
          },
        },
      },
    });
    store.dispatch = vi.fn();
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
       const { rerender } = render(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );
        const players = [
      {
        id: "fake-socket-id",
        board: {
          grid: [
            [1, 0],
            [0, 1],
          ],
        },
        nextPieceGrid: [
          [0, 1],
          [1, 0],
        ],
        isWinner: false,
        isAlive: false,
      },
      {
        id: "otherPlayer",
        board: {
          grid: [
            [0, 0],
            [0, 0],
          ],
        },
        nextPieceGrid: [
          [0, 0],
          [0, 0],
        ],
        isWinner: false,
        isAlive: false,
      },
    ];
        const onConnectCallback = vi.mocked(socket.on).mock.calls.find(([event]) => event === "game state")[1];
    onConnectCallback(players);
    rerender(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );


    const user = userEvent.setup();
    await user.click(screen.getByText(/LEAVE/i));
  });
  it("game started", async () => {

    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
       const { rerender } = render(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );
        const players = [
      {
        id: "fake-socket-id",
        board: {
          grid: [
            [1, 0],
            [0, 1],
          ],
        },
        nextPieceGrid: [
          [0, 1],
          [1, 0],
        ],
        isWinner: false,
        isAlive: false,
      },
      {
        id: "otherPlayer",
        board: {
          grid: [
            [0, 0],
            [0, 0],
          ],
        },
        nextPieceGrid: [
          [0, 0],
          [0, 0],
        ],
        isWinner: false,
        isAlive: false,
      },
    ];
        const onConnectCallback = vi.mocked(socket.on).mock.calls.find(([event]) => event === "game state")[1];
    onConnectCallback(players);
    const onGameStartedCallback = vi.mocked(socket.on).mock.calls.find(([event]) => event === "game started")[1];
    onGameStartedCallback();
    rerender(
      <Provider store={store}>
        <SocketMiddleware>
          <GameView />
        </SocketMiddleware>
      </Provider>
    );

    expect(screen.queryByText(/PLAY AGAIN/i)).toBeNull();
  });
});
