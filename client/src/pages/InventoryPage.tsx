import React, { useEffect, useState } from 'react';
import {
  getInventoryItems,
  deleteInventoryItem,
  addInventoryItem,
  updateInventoryItem,
} from '../servives/inventoryService';
import { InventoryItem } from '../types/inventoryTypes';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Box,
  Button,
  IconButton,
  
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemForm from '../components/ItemForm';
import Grid from '@mui/material/Grid2';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        const items = response.data.content || [];
        setData(items);
        setFilteredData(items);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.sku.toLowerCase().includes(lowerCaseQuery) ||
        item.category.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setFilteredData((prevFiltered) => prevFiltered.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the item.');
    }
  };

  const handleAddOrEdit = async (item: InventoryItem) => {
    if (formMode === 'add') {
      try {
        const response = await addInventoryItem(item);
        const newItem = response.data;

        setData((prevData) => [...prevData, newItem]);
        setFilteredData((prevFiltered) => [...prevFiltered, newItem]);
      } catch (err: any) {
        setError(err.message || 'An error occurred while adding the item.');
      }
    } else if (formMode === 'edit' && item.id) {
      try {
        const response = await updateInventoryItem(item.id, item);
        const updatedItem = response.data;

        setData((prevData) =>
          prevData.map((i) => (i.id === updatedItem.id ? updatedItem : i))
        );
        setFilteredData((prevFiltered) =>
          prevFiltered.map((i) => (i.id === updatedItem.id ? updatedItem : i))
        );
      } catch (err: any) {
        setError(err.message || 'An error occurred while editing the item.');
      }
    }
    setDialogOpen(false);
  };

  const openAddForm = () => {
    setFormMode('add');
    setCurrentItem(null);
    setDialogOpen(true);
  };

  const openEditForm = (item: InventoryItem) => {
    setFormMode('edit');
    setCurrentItem(item);
    setDialogOpen(true);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '50%', maxWidth: 400 }}
        />
        <IconButton
          onClick={openAddForm}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            marginLeft: 2,
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 12,sm:6, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
  <CardContent>
    <Typography variant="h6" color="primary" gutterBottom>
      {item.name}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      SKU: {item.sku}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Quantity: {item.quantity}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Price: ${item.price.toFixed(2)}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Box sx={{  display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openEditForm(item)}
        sx={{ marginRight: 1 }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(item.id!)}
      >
        Delete
      </Button>
    </Box>
  </CardContent>
</Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No items found
          </Typography>
        )}
      </Grid>

      <ItemForm
  open={dialogOpen}
  onClose={() => {
    setDialogOpen(false);
    setCurrentItem(null); 
  }}
  onSubmit={handleAddOrEdit}
  defaultValues={currentItem || undefined}
  mode={formMode}
/>
    </Box>
  );
};

export default InventoryPage;
