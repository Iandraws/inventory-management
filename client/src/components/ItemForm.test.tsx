import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "./ItemForm";
import { InventoryItem } from "../types/inventoryTypes";

// Mock functions
const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

// Default values for the test
const defaultValues: Partial<InventoryItem> = {
  id: 1,
  name: "Test Item",
  sku: "TEST001",
  quantity: 10,
  price: 25.5,
  category: "Electronics",
};

describe("ItemForm Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders ItemForm correctly with default values in edit mode", () => {
    render(
      <ItemForm
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        defaultValues={defaultValues}
        mode="edit"
      />
    );

    // Check if the form title is rendered correctly
    expect(screen.getByText(/Edit Item/i)).toBeInTheDocument();

    // Check if input fields are populated with default values
    expect(screen.getByLabelText(/Name/i)).toHaveValue(defaultValues.name);
    expect(screen.getByLabelText(/SKU/i)).toHaveValue(defaultValues.sku);
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(defaultValues.quantity);
    expect(screen.getByLabelText(/Price/i)).toHaveValue(defaultValues.price);
    expect(screen.getByLabelText(/Category/i)).toHaveValue(defaultValues.category);

    // Check if buttons are rendered correctly
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
  });

  test("calls onSubmit with updated values when Save Changes is clicked in edit mode", () => {
    render(
      <ItemForm
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        defaultValues={defaultValues}
        mode="edit"
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Updated Item" } });

    // Click Save Changes
    fireEvent.click(screen.getByText(/Save Changes/i));

    // Assert onSubmit was called with updated values
    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: defaultValues.id,
      name: "Updated Item",
      sku: "TEST001",
      quantity: 10,
      price: 25.5,
      category: "Electronics",
    });

    // Assert the form was closed
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when Cancel is clicked", () => {
    render(
      <ItemForm
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        defaultValues={defaultValues}
        mode="edit"
      />
    );

    // Click Cancel
    fireEvent.click(screen.getByText(/Cancel/i));

    // Assert onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders empty fields for Add mode", () => {
    render(
      <ItemForm
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        mode="add"
      />
    );

    // Check if fields are empty
    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/SKU/i)).toHaveValue("");
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Price/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Category/i)).toHaveValue("");

    // Check if the form title is "Add New Item"
    expect(screen.getByText(/Add New Item/i)).toBeInTheDocument();
  });

  test("calls onSubmit with new values when Add Item is clicked in add mode", () => {
    render(
      <ItemForm
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        mode="add"
      />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "New Item" } });
    fireEvent.change(screen.getByLabelText(/SKU/i), { target: { value: "NEW001" } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: "99.99" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "Books" } });

    // Click Add Item
    fireEvent.click(screen.getByText(/Add Item/i));

    // Assert onSubmit was called with new values
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: "New Item",
      sku: "NEW001",
      quantity: 20,
      price: 99.99,
      category: "Books",
    }));

    // Assert the form was closed
    expect(mockOnClose).toHaveBeenCalled();
  });
});
