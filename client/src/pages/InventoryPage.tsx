import React, { useEffect, useState } from 'react';
import {
  getInventoryItems,
  deleteInventoryItem,
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
import AddItemForm from '../components/AddItemForm';
import Grid from '@mui/material/Grid2';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleAddItem = (newItem: InventoryItem) => {
    setData((prevData) => [...prevData, newItem]);
    setFilteredData((prevFiltered) => [...prevFiltered, newItem]);
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
          onClick={() => setOpenDialog(true)}
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

      <AddItemForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onItemAdded={handleAddItem}
      />

      <Grid container spacing={2}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Grid size={{ xs: 6,sm:12, md: 4 }} >
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.id!)}
                    sx={{ marginTop: 2 }}
                  >
                    Delete
                  </Button>
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
    </Box>
  );
};

export default InventoryPage;
