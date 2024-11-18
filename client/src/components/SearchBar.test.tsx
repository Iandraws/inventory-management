import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockOnSearchChange = jest.fn();
const mockOnCategoryChange = jest.fn();
const mockOnSortChange = jest.fn();
const mockOnOrderChange = jest.fn();
const mockOnAddClick = jest.fn();

const setup = () => {
  render(
    <SearchBar
      searchQuery=""
      onSearchChange={mockOnSearchChange}
      categoryFilter=""
      onCategoryChange={mockOnCategoryChange}
      sortField="name"
      onSortChange={mockOnSortChange}
      sortOrder="asc"
      onOrderChange={mockOnOrderChange}
      onAddClick={mockOnAddClick}
    />
  );
};

describe("SearchBar Component", () => {
  it("renders all elements correctly", () => {
    setup();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();
    expect(screen.getByLabelText("Order")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onSearchChange when the search input is changed", () => {
    setup();
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("test");
  });

  it("calls onCategoryChange when category dropdown is changed", () => {
    setup();
    const categoryDropdown = screen.getByLabelText("Category");
    fireEvent.mouseDown(categoryDropdown);
    const categoryOption = screen.getByText("Electronics");
    fireEvent.click(categoryOption);
    expect(mockOnCategoryChange).toHaveBeenCalledWith("Electronics");
  });

  it("calls onSortChange when sort dropdown is changed", () => {
    setup();
    const sortDropdown = screen.getByLabelText("Sort By");
    fireEvent.mouseDown(sortDropdown);
    const sortOption = screen.getByText("Price");
    fireEvent.click(sortOption);
    expect(mockOnSortChange).toHaveBeenCalledWith("price");
  });

  it("calls onOrderChange when order dropdown is changed", () => {
    setup();
    const orderDropdown = screen.getByLabelText("Order");
    fireEvent.mouseDown(orderDropdown);
    const orderOption = screen.getByText("Descending");
    fireEvent.click(orderOption);
    expect(mockOnOrderChange).toHaveBeenCalledWith("desc");
  });

  it("calls onAddClick when the add button is clicked", () => {
    setup();
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);
    expect(mockOnAddClick).toHaveBeenCalled();
  });
});
