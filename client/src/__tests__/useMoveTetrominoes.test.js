import { describe, it, expect, beforeEach, render } from "vitest";
import { vi } from "vitest";
import { socket } from "../socket";
import useMoveTetrominoes from "../hooks/useMoveTetrominoes";
import { renderHook } from "@testing-library/react";
vi.mock("../socket", () => ({
  socket: {
    emit: vi.fn(),
  },
}));

describe("useMoveTetrominoes Hook", () => {
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(" moove ArrowLeft", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowLeft" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move left", {
      room: "player1",
      gameId: "123",
    });
    // home.unmount();
  });
  it(" moove ArrowRight", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowRight" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move right", {
      room: "player1",
      gameId: "123",
    });
  });
  it(" moove ArrowDown", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowDown" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move down", {
      room: "player1",
      gameId: "123",
    });
  });
  it(" moove ArrowUp", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("rotate", {
      room: "player1",
      gameId: "123",
    });
  });
  it(" moove Space", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "Space" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move bottom", {
      room: "player1",
      gameId: "123",
    });
  });
  it(" moove doesnt exist", () => {
    renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    const event = new KeyboardEvent("keydown", { code: "dddd" });
    document.dispatchEvent(event);
    expect(socket.emit).not.toHaveBeenCalled();
  });

  it(" moove return remove event listener", () => {
    addEventListenerSpy = vi.spyOn(document, "addEventListener");
    removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useMoveTetrominoes({ room: "player1", gameId: "123" }));
    expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
