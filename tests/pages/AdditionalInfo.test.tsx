import { vi, describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { item } from "../../mocks/data";
import { renderWithProviders } from "../test-utils";
import AdditionalInfo from "../../components/AdditionalInfo/AdditionalInfo";

const mockOnPushRouterQuery = vi.fn();

vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { search: "sky" },
      asPath: "",
      push: mockOnPushRouterQuery,
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

describe("AdditionalInfo", () => {
  it("renders AdditionalInfo component correctly", async () => {
    renderWithProviders(<AdditionalInfo item={item} />);
    const name = await screen.findByText("Luke Skywalker");
    const image = await screen.getByAltText("Luke Skywalker");
    const height = await screen.findByText("Height: 172");
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(height).toBeInTheDocument();
  });
});
