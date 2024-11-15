import React, { useEffect, useState } from 'react';
import { getInventoryItems } from '../servives/inventoryService'
import { InventoryItem } from '../types/inventoryTypes';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        setData(response.data.content || []); 
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Grid container spacing={2} padding={2}>
      {data.length > 0 ? (
        data.map((item: InventoryItem) => (
          <Grid size={{ xs: 12,sm:6,md:4 } }>
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
  );
};

export default InventoryPage;
