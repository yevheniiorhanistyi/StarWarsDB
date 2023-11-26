import { vi, describe, it, expect } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import Pagination from "../../../components/Pagination/Pagination";

const mockOnPageChange = vi.fn();

const mockedRouter = {
  pathname: "/",
  query: {
    page: 1,
  },
};

vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: mockOnPageChange,
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

const renderComponent = (currentPage: number, totalCount: number) =>
  renderWithProviders(
    <Pagination totalCount={totalCount} limit={10} currentPage={currentPage} />,
  );

describe("Pagination", () => {
  it("renders without errors", () => {
    const { container } = renderComponent(1, 10);
    expect(container).toBeInTheDocument();
  });

  it("renders correct number of buttons", () => {
    const { getAllByRole } = renderComponent(1, 60);
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(10);
  });

  it("calls onPageChange when a button is clicked", () => {
    const { getByText } = renderComponent(1, 10);
    const button = getByText("1");
    fireEvent.click(button);
    expect(mockOnPageChange).toHaveBeenCalledWith(mockedRouter);
  });

  it("disables previous button on the first page", () => {
    const { getByText } = renderComponent(1, 10);
    const prevButton = getByText("<");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on the last page", () => {
    const { getByText } = renderComponent(1, 10);
    const nextButton = getByText(">");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when a button next is clicked", async () => {
    const { getByText } = renderComponent(1, 80);
    const button = getByText(">");
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockOnPageChange).toHaveBeenCalledWith(mockedRouter),
    );
  });

  it("calls onPageChange when a button previous is clicked", async () => {
    const { getByText } = renderComponent(3, 80);
    const button = getByText("<");
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockOnPageChange).toHaveBeenCalledWith(mockedRouter),
    );
  });

  it("does not render buttons when paginationRange is empty", () => {
    const { queryByRole } = renderComponent(1, 0);
    const buttons = queryByRole("button");
    expect(buttons).toBeNull();
  });
});
