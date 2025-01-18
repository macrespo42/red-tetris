import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from "../store";
import HomeView from "../components/HomeView";
import RoomView from "../components/RoomView";



test("home render", () => {
  const home = render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>
  );
  expect(screen.getByText(/RED TETRIS/)).toBeDefined();
  home.unmount();
});

