import React, { useEffect, useState } from 'react';
import { getInventoryItems, deleteInventoryItem } from '../servives/inventoryService';
import { InventoryItem } from '../types/inventoryTypes';
import { Card, CardContent, Typography, CircularProgress, TextField, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

const InventoryPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        const items = response.data.content || [];
        setData(items);

        // Apply search filtering directly after fetching the data
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = items.filter((item: InventoryItem) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.sku.toLowerCase().includes(lowerCaseQuery) ||
          item.category.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filtered);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id); // Call the API to delete the item
      setData((prevData) => prevData.filter((item) => item.id !== id)); // Update state
      setFilteredData((prevFiltered) => prevFiltered.filter((item) => item.id !== id)); // Update filtered list
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the item.');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '50%', maxWidth: 400 }}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredData.length > 0 ? (
          filteredData.map((item: InventoryItem) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    onClick={() => handleDelete(item.id!)} // Add "!" to assure TypeScript that `id` will not be undefined
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
