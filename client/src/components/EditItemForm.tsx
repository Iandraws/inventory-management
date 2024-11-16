import React, { useState } from 'react';
import { updateInventoryItem } from '../servives/inventoryService'; // Updated path for consistency
import { TextField, Button, Box, Typography } from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';

interface EditItemFormProps {
  item: InventoryItem; // Item to edit
  onClose: () => void; // Callback to close the form
  onItemUpdated: (updatedItem: InventoryItem) => void; // Callback to handle the updated item
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onClose, onItemUpdated }) => {
  const [name, setName] = useState(item.name);
  const [sku, setSku] = useState(item.sku);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [price, setPrice] = useState(item.price.toString());
  const [category, setCategory] = useState(item.category);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  const handleSubmit = async () => {
    setIsSaving(true); // Start saving state
    try {
      const updatedItem: InventoryItem = {
        ...item,
        name,
        sku,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        category,
      };

      // Call API to update the item
      await updateInventoryItem(updatedItem.id!, updatedItem);

      // Trigger parent callback with the updated item
      onItemUpdated(updatedItem);

      // Close the form
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the item.');
    } finally {
      setIsSaving(false); // End saving state
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom>
        Edit Item
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="SKU"
          variant="outlined"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSaving} // Disable button when saving
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditItemForm;
