import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InventoryTable from "../components/InventoryTable";

const mockData = [
  { id: 1, name: "Item 1", sku: "SKU001", quantity: 10, price: 100, category: "Books" },
  { id: 2, name: "Item 2", sku: "SKU002", quantity: 5, price: 50, category: "Electronics" },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnSortChange = jest.fn();
const mockOnOrderChange = jest.fn();

describe("InventoryTable Component", () => {
  test("renders items correctly", () => {
    render(
      <InventoryTable
        data={mockData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        sortField="name"
        sortOrder="asc"
        onSortChange={mockOnSortChange}
        onOrderChange={mockOnOrderChange}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  test("calls onEdit when Edit button is clicked", () => {
    render(
      <InventoryTable
        data={mockData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        sortField="name"
        sortOrder="asc"
        onSortChange={mockOnSortChange}
        onOrderChange={mockOnOrderChange}
      />
    );

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
  });

  test("calls onDelete when Delete button is clicked", () => {
    render(
      <InventoryTable
        data={mockData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        sortField="name"
        sortOrder="asc"
        onSortChange={mockOnSortChange}
        onOrderChange={mockOnOrderChange}
      />
    );

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockData[0].id);
  });

  test("calls onSortChange and onOrderChange when column header is clicked", () => {
    render(
      <InventoryTable
        data={mockData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        sortField="name"
        sortOrder="asc"
        onSortChange={mockOnSortChange}
        onOrderChange={mockOnOrderChange}
      />
    );

    // Use getByRole to find the Name column header
    const nameHeaderButton = screen.getByRole("button", { name: /name/i });

    // Click the name header to trigger sorting
    fireEvent.click(nameHeaderButton);

    // Since sortField is already "name", clicking should toggle the order
    expect(mockOnOrderChange).toHaveBeenCalledWith("desc");
  });
});
