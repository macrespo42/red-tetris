import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    value: {
      socketId: "",
      name: "",
      roomName: "",
      isGameOwner: false,
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
    isGameOwner: (state, action) => {
      state.value.isGameOwner = action.payload.isGameOwner;
    },
  },
});

export const { all, socketId, name, roomName, isGameOwner } =
  playerSlice.actions;
export default playerSlice.reducer;
