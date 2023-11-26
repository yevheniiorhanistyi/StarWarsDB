import { vi, describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { ICharData } from "../../../types/types";
import { itemList } from "../../../mocks/data";
import { renderWithProviders } from "../../test-utils";
import * as utils from "../../../utils";
import CharList from "../../../components/CharList/CharList";

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

const renderComponent = (items: ICharData[], limit: number) =>
  renderWithProviders(<CharList items={items} limit={limit} />);

describe("CharList", () => {
  it("return the corresponding message if the data is missing", () => {
    renderComponent([], 10);

    const noResultsText = screen.getByText(
      "No results found in this galaxy...",
    );
    const noResultsImage = screen.getByAltText("Sormtroopers");
    expect(noResultsText).toBeInTheDocument();
    expect(noResultsImage).toBeInTheDocument();
  });

  it("return the list of items", async () => {
    renderComponent(itemList, 10);

    const itemsList = await screen.getByRole("list", { name: "" });
    expect(itemsList).toBeInTheDocument();
  });

  it("calls openInfo when a card is clicked", () => {
    const getNumberFromStringSpy = vi.spyOn(utils, "getNumberFromString");
    renderComponent(itemList, 10);
    const firstCardButton = screen.getByTestId(itemList[0].name);

    fireEvent.click(firstCardButton);
    expect(getNumberFromStringSpy).toHaveBeenCalledWith(itemList[0].url);
  });
});
