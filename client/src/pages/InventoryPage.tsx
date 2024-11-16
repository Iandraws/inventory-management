import React, { useEffect, useState } from 'react';
import { getInventoryItems } from '../servives/inventoryService';
import { InventoryItem } from '../types/inventoryTypes';
import { Card, CardContent, Typography, CircularProgress, TextField, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        setData(response.data.content || []);
        setFilteredData(response.data.content || []); // Initialize filtered data
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on the search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.sku.toLowerCase().includes(lowerCaseQuery) ||
        item.category.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

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
