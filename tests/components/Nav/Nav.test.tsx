import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Nav from "../../../components/Nav/Nav";

describe("Navigation", () => {
  it("renders without errors", () => {
    const { container } = render(<Nav />);
    expect(container).toBeInTheDocument();
  });
});
