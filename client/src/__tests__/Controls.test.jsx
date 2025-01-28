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
import Controls from "../components/Controls";

describe("Controls", () => {
  it("render controls", () => {
    render(<Controls />);
    expect(screen.getByText(/Rotate/i)).toBeDefined();
  });
});