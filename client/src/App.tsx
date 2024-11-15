import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Container>
        <Box textAlign="center" my={4}>
          <Typography variant="h4" color="primary" gutterBottom>
            Inventory Management System
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your inventory with ease. Use the options below to add, edit, or delete items.
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Add Item
            </Button>
            <Button variant="outlined" color="secondary">
              View Inventory
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
