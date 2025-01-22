import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi, beforeEach,  } from "vitest";
import { socket } from "../socket";
import SocketMiddleware from "../components/SocketMiddleware";
import { Provider } from "react-redux";
import playerReducer from "../playerSlice";
import { configureStore } from "@reduxjs/toolkit";
 

vi.mock("../socket", () => ({
  socket: {
    on:  vi.fn(),
    off: vi.fn(),
    disconnect: vi.fn(),
    emit: vi.fn(),
    connect: vi.fn(),
    id: "test-socket-id"
}}));

describe("socket middleware", () => {

  let store;
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        player: playerReducer,
      },
      preloadedState: {
        player: {
          value: {
            socketId: "",
            name: "",
            roomName: "",
            isGameOwner: false,
          },
        },
      },
    });

  });
    const consoleLogSpy  = vi.spyOn(console, "log").mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  
  it("connect socket", () => {
    render(
      <Provider store={store}>
        <SocketMiddleware>{<div>cc</div>}</SocketMiddleware>
      </Provider>
    );
       const onConnectCallback = socket.on.mock.calls.find(
      ([event]) => event === "connect"
    )[1];
    onConnectCallback();

    expect(consoleLogSpy).toHaveBeenCalledWith("Connected: test-socket-id");
    expect(store.getState().player.value.socketId).toBe("test-socket-id");
  });

    it("connect  error socket", () => {
    render(
      <Provider store={store}>
        <SocketMiddleware>{<div>cc</div>}</SocketMiddleware>
      </Provider>
    );
       const onConnectCallback = vi.mocked(socket.on).mock.calls.find(
      ([event]) => event === "connect_error"
    )[1];

    onConnectCallback(new Error("Test error"));
    expect(consoleErrorSpy).toHaveBeenCalledWith("Connection error: ", "Test error" );
  });

      it("connect  error socket", () => {
    const { unmount } = render(
      <Provider store={store}>
        <SocketMiddleware>{<div>cc</div>}</SocketMiddleware>
      </Provider>
    );

    unmount();
    expect(socket.disconnect).toHaveBeenCalled();
    expect(socket.off).toHaveBeenCalledWith("connect");
    expect(socket.off).toHaveBeenCalledWith("connect_error");
  });
});