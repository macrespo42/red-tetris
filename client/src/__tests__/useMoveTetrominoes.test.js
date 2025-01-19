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
    addEventListenerSpy = vi.spyOn(document, "addEventListener");
    removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
  });

  it(" moove ArrowLeft", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowLeft" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move left", "player1");
    // home.unmount();
  });
  it(" moove ArrowRight", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowRight" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move right", "player1");
  });
  it(" moove ArrowDown", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowDown" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move down", "player1");
  });
  it(" moove ArrowUp", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("rotate", "player1");
  });
  it(" moove Space", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "Space" });
    document.dispatchEvent(event);
    expect(socket.emit).toHaveBeenCalledWith("move bottom", "player1");
  });
  it(" moove doesnt exist", () => {
    renderHook(() => useMoveTetrominoes({ id: "player1" }));
    const event = new KeyboardEvent("keydown", { code: "dddd" });
    document.dispatchEvent(event);
    expect(socket.emit).not.toHaveBeenCalled();
  });

  it(" moove return remove event listener", () => {
    const { unmount } = renderHook(() => useMoveTetrominoes({ id: "player1" }));
    expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown");
  });
});
