import { render, } from "@testing-library/react";
import { describe, it, expect, } from "vitest";
import App from "../components/App";
import { vi, beforeEach, afterEach } from 'vitest';

// Mock de createRoot pour capturer les appels à cette fonction
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('DOM rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });


  it('renders without crashing', () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    render(
        <App />,
      { container: rootDiv } 
    );

    expect(document.body.innerHTML).toMatch(/RED TETRIS/i); 
  });
})


