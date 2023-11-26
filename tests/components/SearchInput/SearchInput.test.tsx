import { vi, describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import SearchInput from "../../../components/SearchInput/SearchInput";

const mockOnPushRouterQuery = vi.fn();

const mockedRouter = {
  query: {
    page: 1,
    search: "abc",
  },
};

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

const renderComponent = () => renderWithProviders(<SearchInput />);

describe("SearchInput", () => {
  it("renders without errors", () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it("component should access context properly", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Type to search")).toHaveValue("sky");
  });

  it("calls onSearchChange when input value changes", async () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText("Type to search");
    const submitButton = screen.getByRole("button", { name: "" });

    fireEvent.change(inputElement, { target: { value: "abc" } });
    fireEvent.submit(submitButton);

    expect(mockOnPushRouterQuery).toHaveBeenCalledWith(mockedRouter);
  });
});
