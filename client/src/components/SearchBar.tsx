// src/components/SearchBar.tsx
import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, onAddClick }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: '50%', maxWidth: 400 }}
      />
      <IconButton
        onClick={onAddClick}
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
  );
};

export default SearchBar;
