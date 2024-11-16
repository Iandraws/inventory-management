import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';

interface AddItemFormProps {
  open: boolean;
  onClose: () => void;
  onItemAdded: (newItem: InventoryItem) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ open, onClose, onItemAdded }) => {
  const [formFields, setFormFields] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: '',
    category: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newItem: InventoryItem = {
        id: Date.now(), // Temporary unique ID
        name: formFields.name,
        sku: formFields.sku,
        quantity: parseInt(formFields.quantity, 10),
        price: parseFloat(formFields.price),
        category: formFields.category,
      };

      onItemAdded(newItem);

      // Reset form fields and close dialog
      setFormFields({ name: '', sku: '', quantity: '', price: '', category: '' });
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while adding the item.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          {['name', 'sku', 'quantity', 'price', 'category'].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              variant="outlined"
              fullWidth
              value={formFields[field as keyof typeof formFields]}
              onChange={handleInputChange}
              type={['quantity', 'price'].includes(field) ? 'number' : 'text'}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemForm;
