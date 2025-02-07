import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Controls from "../components/Controls";

describe("Controls", () => {
  it("render controls", () => {
    render(<Controls />);
    expect(screen.getByText(/Rotate/i)).toBeDefined();
  });
});