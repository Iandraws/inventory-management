import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box,
} from "@mui/material";
import { InventoryItem,ItemFormProps } from "../types/inventoryTypes";



const ItemForm: React.FC<ItemFormProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  mode,
}) => {
  const [formFields, setFormFields] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setFormFields({
        name: defaultValues.name || "",
        sku: defaultValues.sku || "",
        quantity: defaultValues.quantity?.toString() || "",
        price: defaultValues.price?.toString() || "",
        category: defaultValues.category || "",
      });
    } else {
      setFormFields({
        name: "",
        sku: "",
        quantity: "",
        price: "",
        category: "",
      });
    }
  }, [defaultValues, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const item: InventoryItem = {
      id: defaultValues?.id || Date.now(),
      name: formFields.name,
      sku: formFields.sku,
      quantity: parseInt(formFields.quantity, 10),
      price: parseFloat(formFields.price),
      category: formFields.category,
    };
    onSubmit(item);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{mode === "add" ? "Add New Item" : "Edit Item"}</DialogTitle>
      <DialogContent>
        {["name", "sku", "quantity", "price", "category"].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            variant="outlined"
            fullWidth
            value={formFields[field as keyof typeof formFields]}
            onChange={handleInputChange}
            type={["quantity", "price"].includes(field) ? "number" : "text"}
            sx={{ mb: 2 }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              onClose();
              setFormFields({
                name: "",
                sku: "",
                quantity: "",
                price: "",
                category: "",
              });
            }}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {mode === "add" ? "Add Item" : "Save Changes"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ItemForm;
