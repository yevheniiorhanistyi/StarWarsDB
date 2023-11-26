import { describe, it, expect } from "vitest";
import charactersReducer, {
  setItem,
  setItems,
  setTotalCount,
  setTerm,
  setCurrentPage,
  setLimit,
  initialState,
} from "../../redux/charactersSlice";
import { item, itemList } from "../../mocks/data";

describe("charactersSlice", () => {
  it("should set item", () => {
    const nextState = charactersReducer(initialState, setItem(item));
    expect(nextState.item).toEqual(item);
    expect(nextState.isLoadingCharacter).toBe(false);
  });

  it("should set items", () => {
    const nextState = charactersReducer(initialState, setItems(itemList));
    expect(nextState.items).toEqual(itemList);
    expect(nextState.isLoadingCharacters).toBe(false);
  });

  it("should set total count", () => {
    const nextState = charactersReducer(initialState, setTotalCount(10));
    expect(nextState.totalCount).toEqual(10);
  });

  it("should set term", () => {
    const nextState = charactersReducer(initialState, setTerm("abc"));
    expect(nextState.term).toEqual("abc");
  });

  it("should set current page", () => {
    const nextState = charactersReducer(initialState, setCurrentPage(5));
    expect(nextState.currentPage).toEqual(5);
  });

  it("should set limit", () => {
    const nextState = charactersReducer(initialState, setLimit(25));
    expect(nextState.limit).toEqual(25);
  });
});
