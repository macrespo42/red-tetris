import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    value: {
      socketId: "1234",
      name: "roger",
      roomName: "42",
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
    socketId: (state, action) => {
      state.value.socketId = action.payload.socketId;
    },
    name: (state, action) => {
      state.value.name = action.payload.name;
    },
    roomName: (state, action) => {
      state.value.roomName = action.payload.roomName;
    },
  },
});

export const { all, socketId, name, roomName } = playerSlice.actions;
export default playerSlice.reducer;
