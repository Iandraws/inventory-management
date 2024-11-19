import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Typography,
  TableSortLabel,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { InventoryItem } from "../types/inventoryTypes";
import {InventoryTableProps} from "../types/inventoryTypes"



import BooksImage from "../assets/Books.jpg";
import ClothingImage from "../assets/Clothing.jpg";
import ElectronicsImage from "../assets/Electronics.jpg";
import AppliancesImage from "../assets/Appliances.jpg";
import FurnitureImage from "../assets/Furniture.jpg";



const categoryImages: Record<string, string> = {
  Books: BooksImage,
  Clothing: ClothingImage,
  Electronics: ElectronicsImage,
  Appliances: AppliancesImage,
  Furniture: FurnitureImage,
};

const InventoryTable: React.FC<InventoryTableProps> = ({
  data,
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  onSortChange,
  onOrderChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      onOrderChange(sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(field);
      onOrderChange("asc");
    }
  };

  if (isMobile) {
    // Render card layout for mobile
    return (
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {data.map((item) => (
          <Card key={item.id} sx={{ borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
              <Box sx={{ display: "flex", gap: 2 }}>
                <img
                  src={
                    categoryImages[item.category] ||
                    "https://via.placeholder.com/100?text=No+Image"
                  }
                  alt={item.category}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    SKU: {item.sku}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: {item.price.toFixed(2)} $
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {item.category}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="small" onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button variant="contained" color="error" size="small" onClick={() => onDelete(item.id!)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    );
  }

  // Render table layout for larger screens
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Image</TableCell>
            <TableCell
              sx={{ color: "#fff", fontWeight: "bold" }}
              sortDirection={sortField === "name" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "name"}
                direction={sortField === "name" ? sortOrder : "asc"}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>SKU</TableCell>
            <TableCell
              sx={{ color: "#fff", fontWeight: "bold" }}
              sortDirection={sortField === "quantity" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "quantity"}
                direction={sortField === "quantity" ? sortOrder : "asc"}
                onClick={() => handleSort("quantity")}
              >
                Quantity
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontWeight: "bold", textAlign: "right" }}
              sortDirection={sortField === "price" ? sortOrder : false}
            >
              <TableSortLabel
                active={sortField === "price"}
                direction={sortField === "price" ? sortOrder : "asc"}
                onClick={() => handleSort("price")}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <TableCell>
                <img
                  src={
                    categoryImages[item.category] ||
                    "https://via.placeholder.com/100?text=No+Image"
                  }
                  alt={item.category}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {item.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="textSecondary">
                  {item.sku}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="textSecondary">
                  {item.quantity}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                <Typography variant="body2" color="textSecondary">
                  {item.price.toFixed(2)} $
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    backgroundColor: "#e8f4f8",
                    padding: "2px 6px",
                    borderRadius: "12px",
                    textAlign: "center",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >
                  {item.category}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEdit(item)}
                    sx={{ textTransform: "none", boxShadow: "none" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(item.id!)}
                    sx={{ textTransform: "none", boxShadow: "none" }}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
