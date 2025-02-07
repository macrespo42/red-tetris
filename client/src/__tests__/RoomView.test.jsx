import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { socket } from "../socket";
import RoomView from "../components/RoomView";
import { vi, beforeEach } from "vitest";
import SocketMiddleware from "../components/SocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer, {
  gameId,
  name,
  roomName,
} from "../playerSlice";

import React from "react";

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
            isGameOwner: false,
          },
        },
      },
    });
    store.dispatch = vi.fn();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  vi.mock("react-router", () => ({
    ...vi.importActual("react-router"),
    useNavigate: () => vi.fn(),
    useParams: () => ({ room: "testRoom", player: "testPlayer" }),
    MemoryRouter: () => vi.fn(),
    Routes: () => vi.fn(),
    Route: () => vi.fn(),
  }));
  it("home render", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    expect(screen.getByText("testRoom")).toBeDefined();
    home.unmount();
  });

  it("socket on", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "players list",
    )[1];
    const mockPlayers = [
      { id: "test-socket-id", name: "Player 1", isGameOwner: true },
      { id: "player-2", name: "Player 2", isGameOwner: false },
    ];
    onConnectCallback(mockPlayers);
    expect(store.getState().player.value.socketId).toBe("fake-socket-id");
    expect(screen.getByText(/testRoom/i)).toBeDefined();
    home.unmount();
  });
  it("start game", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "players list",
    )[1];
    const mockPlayers = [
      { id: "test-socket-id", name: "Player 1", isGameOwner: true },
      { id: "player-2", name: "Player 2", isGameOwner: false },
    ];
    onConnectCallback(mockPlayers);
    expect(screen.queryByText(/START/i)).toBe(null);
    expect(socket.emit).toHaveBeenCalledWith("joining room", {
      player: "testPlayer",
      room: "testRoom",
      socketId: "fake-socket-id",
    });
    home.unmount();
  });
});

describe("room view socket", () => {
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
            gameId: "fake-game-id",
          },
        },
      },
    });
    store.dispatch = vi.fn();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  vi.mock("react-router", () => ({
    ...vi.importActual("react-router"),
    useNavigate: vi.fn(),
    useParams: () => ({ room: "testRoom", player: "testPlayer" }),
    MemoryRouter: () => vi.fn(),
    Routes: () => vi.fn(),
    Route: () => vi.fn(),
  }));

  it("start game", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "players list",
    )[1];
    const mockPlayers = [
      { id: "fake-socket-id", name: "fake-name", isGameOwner: true },
      { id: "player-2", name: "Player 2", isGameOwner: false },
    ];
    onConnectCallback(mockPlayers);
    expect(store.getState().player.value.name).toBe("fake-name");
    expect(store.getState().player.value.roomName).toBe("fake-room-name");
    expect(store.getState().player.value.isGameOwner).toBe(true);
    expect(socket.emit).toHaveBeenCalledWith("joining room", {
      player: "testPlayer",
      room: "testRoom",
      socketId: "fake-socket-id",
    });
    const user = userEvent.setup();
    await user.click(screen.getByText(/START/i));
    expect(socket.emit).toHaveBeenCalledWith("start game", {
      gameIdentifier: "fake-game-id",
      room: "testRoom",
      gameMode: "normal",
    });
    home.unmount();
  });
  it("game info", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "players list",
    )[1];
    const mockPlayers = [
      { id: "fake-socket-id", name: "fake-name", isGameOwner: true },
      { id: "player-2", name: "Player 2", isGameOwner: false },
    ];
    store.getState().player.value.isGameOwner = true;
    onConnectCallback(mockPlayers);
    const onGameInfo = socket.on.mock.calls.find(
      ([event]) => event === "game infos",
    )[1];
    onGameInfo("fake-game-id");
    expect(store.getState().player.value.gameId).toBe("fake-game-id");
    home.unmount();
  });
  it("should navigate to game page when game started", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const mockPlayers = [
      {
        id: "fake-socket-id",
        name: "Player1",
        isGameOwner: true,
        gameId: "fake-game-id",
      },
      {
        id: "player-2",
        name: "Player 4",
        isGameOwner: false,
        gameId: "testRoom",
      },
    ];

    const playersListCall = vi
      .mocked(socket.on)
      .mock.calls.find(([event]) => event === "players list");
    const onConnectCallback = playersListCall[1];
    onConnectCallback(mockPlayers);

    const onGameStarted = socket.on.mock.calls.find(
      ([event]) => event === "game started",
    )[1];
    onGameStarted("fake-game-id");
    expect(navigate).toHaveBeenCalledWith("/fake-game-id/testPlayer");
    home.unmount();
  });
  it("should dispatch actions and emit socket event on mount", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledWith(name({ name: "testPlayer" }));
    expect(store.dispatch).toHaveBeenCalledWith(
      roomName({ roomName: "testRoom" }),
    );
    expect(socket.emit).toHaveBeenCalledWith("joining room", {
      room: "testRoom",
      player: "testPlayer",
      socketId: "fake-socket-id",
    });

    home.unmount();
  });
  it("should close the modal when handleOnClose is called", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const settingsButton = screen.getByLabelText("game_settings");
    fireEvent.click(settingsButton);

    expect(screen.getByText("Settings")).toBeDefined();

    const closeButton = screen.getByText("Confirm");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Settings")).toBeNull();

    home.unmount();
  });
  it("should update game mode when a new mode is selected", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const settingsButton = screen.getByLabelText("game_settings");
    fireEvent.click(settingsButton);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "sudden_death" } });

    expect(selectElement.value).toBe("sudden_death");

    home.unmount();
  });
  it("should update players list and dispatch isGameOwner action on players list event", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "players list",
    )[1];
    const mockPlayers = [
      { id: "fake-socket-id", name: "Player 1", isGameOwner: true },
      { id: "player-2", name: "Player 2", isGameOwner: false },
    ];
    onConnectCallback(mockPlayers);

    expect(store.dispatch).toHaveBeenCalledWith(name({ name: "testPlayer" }));
    expect(store.dispatch).toHaveBeenCalledWith(
      roomName({ roomName: "testRoom" }),
    );
    // expect(screen.getByText("Player 1 👑")).toBeDefined();
    // expect(screen.getByText("Player 2")).toBeDefined();

    home.unmount();
  });
  it("should update gameId in store on game infos event", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const onGameInfoCallback = socket.on.mock.calls.find(
      ([event]) => event === "game infos",
    )[1];
    onGameInfoCallback("new-game-id");
    expect(store.dispatch).toHaveBeenCalledWith(
      gameId({ gameId: "new-game-id" }),
    );

    home.unmount();
  });
  it("should emit start game event when start button is clicked", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const startButton = screen.getByText("START");
    fireEvent.click(startButton);

    expect(socket.emit).toHaveBeenCalledWith("start game", {
      gameIdentifier: "fake-game-id",
      room: "testRoom",
      gameMode: "normal",
    });

    home.unmount();
  });
  it("should render Tetrominoes component", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    expect(screen.findAllByText("tetrominoes")).toBeDefined();

    home.unmount();
  });

  it("should render EndGameModal component", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const settingsButton = screen.getByLabelText("game_settings");
    fireEvent.click(settingsButton);

    expect(screen.getByText("Settings")).toBeDefined();

    home.unmount();
  });
  it("should not navigate to game page when game started", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const mockPlayers = [
      {
        id: "fake-socket-id",
        name: "Player1",
        isGameOwner: true,
        gameId: "fake-game-id",
      },
      {
        id: "player-2",
        name: "Player 4",
        isGameOwner: false,
        gameId: "testRoom",
      },
    ];

    const playersListCall = vi
      .mocked(socket.on)
      .mock.calls.find(([event]) => event === "players list");
    const onConnectCallback = playersListCall[1];
    onConnectCallback(mockPlayers);

    const onGameStarted = socket.on.mock.calls.find(
      ([event]) => event === "game started",
    )[1];
    onGameStarted("testRoom");
    expect(navigate).not.toHaveBeenCalledWith("/fake-game-id/testPlayer");
    home.unmount();
  });
  it("should not navigate to game page when game started", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const mockPlayers = [
      {
        id: "fake-socket-id",
        name: "Player1",
        isGameOwner: true,
        gameId: "fake-game-id",
      },
      {
        id: "player-2",
        name: "Player 4",
        isGameOwner: false,
        gameId: "testRoom",
      },
    ];

    const playersListCall = vi
      .mocked(socket.on)
      .mock.calls.find(([event]) => event === "players list");
    const onConnectCallback = playersListCall[1];
    onConnectCallback(mockPlayers);

    const onGameStarted = socket.on.mock.calls.find(
      ([event]) => event === "game started",
    )[1];
    onGameStarted("testRoom");
    expect(navigate).not.toHaveBeenCalledWith("/fake-game-id/testPlayer");
    home.unmount();
  });
  it("should not navigate to game page when game started", async () => {
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );
    const settingsButton = screen.getByLabelText("game_settings");
    expect(settingsButton).toBeDefined();
    const user = userEvent.setup();
    await user.click(settingsButton);
    const el = screen.getByTestId("close-modal");
    expect(screen.getByText("Settings")).toBeDefined();
    await user.click(el);
    expect(screen.queryByText("Settings")).toBeNull();

    vi.restoreAllMocks();
    home.unmount();
  });
  it("should not navigate to game page when game started", async () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const home = render(
      <Provider store={store}>
        <SocketMiddleware>
          <RoomView />
        </SocketMiddleware>
      </Provider>,
    );

    const mockPlayers = [
      {
        id: "fake-socket-id",
        name: "Player1",
        isGameOwner: true,
        gameId: "fake-game-id",
      },
      {
        id: "player-2",
        name: "Player 4",
        isGameOwner: false,
        gameId: "testRoom",
      },
    ];

    const playersListCall = vi
      .mocked(socket.on)
      .mock.calls.find(([event]) => event === "players list");
    const onConnectCallback = playersListCall[1];
    onConnectCallback(mockPlayers);

    const onGameStarted = socket.on.mock.calls.find(
      ([event]) => event === "game started",
    )[1];
    onGameStarted("testRoom");
    expect(navigate).not.toHaveBeenCalledWith("/fake-game-id/testPlayer");
    home.unmount();
  });
});
