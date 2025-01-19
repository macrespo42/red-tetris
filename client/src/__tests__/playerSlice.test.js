import { describe, it, expect } from "vitest";
import playerReducer, { all, socketId, name, roomName, isGameOwner } from "../playerSlice";

describe("playerSlice", () => {
  const initialState = {
    value: {
      socketId: "",
      name: "",
      roomName: "",
      isGameOwner: false,
    },
  };

  it("should handle initial state", () => {
    expect(playerReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle all reducer", () => {
    const newState = {
      socketId: "1234",
      name: "Player1",
      roomName: "RoomA",
      isGameOwner: true,
    };
    const action = all(newState);
    const state = playerReducer(initialState, action);
    expect(state.value).toEqual(newState);
  });

  it("should handle socketId reducer", () => {
    const action = socketId({ socketId: "1234" });
    const state = playerReducer(initialState, action);
    expect(state.value.socketId).toBe("1234");
  });

  it("should handle name reducer", () => {
    const action = name({ name: "Player1" });
    const state = playerReducer(initialState, action);
    expect(state.value.name).toBe("Player1");
  });
  it("should handle all reducer", () => {
    const newState = {
      socketId: "124",
      name: "Player3",
      roomName: "RoomB",
      isGameOwner: false,
    };
    const action = all(newState);
    const state = playerReducer(initialState, action);
    expect(state.value).toBe(newState);
  });

  it("should handle roomName reducer", () => {
    const action = roomName({ roomName: "RoomA" });
    const state = playerReducer(initialState, action);
    expect(state.value.roomName).toBe("RoomA");
  });

  it("should handle isGameOwner reducer", () => {
    const action = isGameOwner({ isGameOwner: true });
    const state = playerReducer(initialState, action);
    expect(state.value.isGameOwner).toBe(true);
  });
});
