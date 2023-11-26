import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../../../components/Header/Header";

describe("Header", () => {
  it('renders logo with alt text "Star Wars"', () => {
    render(<Header />);
    const logoElement = screen.getByAltText("Star Wars");
    expect(logoElement).toBeInTheDocument();
  });

  it("renders navigation component", () => {
    render(<Header />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });
});
