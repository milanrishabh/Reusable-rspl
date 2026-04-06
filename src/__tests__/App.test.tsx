import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../App";

describe("App", () => {
  it("renders the showcase shell and integration content", () => {
    render(<App />);

    expect(screen.getByText("RSPL reusable UI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Integrate the library in your app" }),
    ).toBeInTheDocument();
  });
});
