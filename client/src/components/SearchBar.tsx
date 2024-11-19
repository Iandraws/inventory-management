import React from "react";
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent,Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
  sortField: string;
  onSortChange: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "asc" | "desc";
  onOrderChange: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  onAddClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sortField,
  onSortChange,
  sortOrder,
  onOrderChange,
  onAddClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
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
          maxWidth: "200px",
          minWidth: "150px",
        }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        <MenuItem value="Furniture">Furniture</MenuItem>
        <MenuItem value="Appliances">Appliances</MenuItem>
      </TextField>

      {/* Sort By Dropdown */}
      <FormControl size="small" sx={{ minWidth: "75px" }}>
  <InputLabel id="sort-by-label">Sort By</InputLabel>
  <Select
    labelId="sort-by-label"
    value={sortField}
    onChange={(e: SelectChangeEvent<string>) => onSortChange(e.target.value)}
    label="Sort By"
  >
    <MenuItem value="name">Name</MenuItem>
    <MenuItem value="price">Price</MenuItem>
    <MenuItem value="category">Category</MenuItem>
    <MenuItem value="quantity">Quantity</MenuItem>
  </Select>
</FormControl>


<FormControl size="small">
  <InputLabel id="order-label">Order</InputLabel>
  <Select
    labelId="order-label"
    value={sortOrder}
    onChange={(e: SelectChangeEvent<"asc" | "desc">) =>
      onOrderChange(e.target.value as "asc" | "desc")
    }
    label="Order"
  >
    <MenuItem value="asc">Ascending</MenuItem>
    <MenuItem value="desc">Descending</MenuItem>
  </Select>
</FormControl>


      {/* Add Item Button */}
      <Button
  variant="contained"
  color="primary"
  onClick={onAddClick}
  aria-label="Add"
  data-testid="add-button"
  sx={{
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
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
