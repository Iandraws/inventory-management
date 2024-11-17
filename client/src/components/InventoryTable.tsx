import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
  ,
} from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';
import Grid from '@mui/material/Grid2'

interface InventoryTableProps {
  data: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {data.length > 0 ? (
        data.map((item) => (
          <Grid size={{xs:12,sm:6,md:4}} key={item.id}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(item.id!)}
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
  );
};

export default InventoryTable;
