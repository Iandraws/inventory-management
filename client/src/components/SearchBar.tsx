import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
  onAddClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  onAddClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mb: 3,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Search Field */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: "1",
          maxWidth: "300px",
          minWidth: "200px",
        }}
      />

      {/* Category Dropdown */}
      <TextField
        label="Category"
        select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        variant="outlined"
        sx={{
          flex: "1",
          maxWidth: "120px",
          minWidth: "120px",
        }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        <MenuItem value="Furniture">Furniture</MenuItem>
        <MenuItem value="Appliances">Appliances</MenuItem>
      </TextField>

      {/* Add Item Button */}
      <Button
  variant="contained"
  color="primary"
  onClick={onAddClick}
  sx={{
    borderRadius: '50%', // Makes the button circular
    width: '50px', // Adjust the width
    height: '50px', // Adjust the height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0, // Remove the default min-width
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#115293",
    },
  }}
>
  <AddIcon />
</Button>

    </Box>
  );
};

export default SearchBar;
