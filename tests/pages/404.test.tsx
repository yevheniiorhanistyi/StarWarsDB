import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import NotFoudPage from "../../pages/404";

describe("NotFound404 component", () => {
  it("renders the component correctly", () => {
    renderWithProviders(<NotFoudPage />);

    const imgElement = screen.getByAltText("Nothing not found");
    expect(imgElement).toBeInTheDocument();

    const headingElement = screen.getByText(
      /Great shot kid. That was one in a million./i,
    );
    expect(headingElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: /Let's get you home/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/");
  });
});
