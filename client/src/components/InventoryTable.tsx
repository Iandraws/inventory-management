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
} from "@mui/material";
import { InventoryItem } from "../types/inventoryTypes";

// Import your images
import BooksImage from "../assets/Books.jpg";
import ClothingImage from "../assets/Clothing.jpg";
import ElectronicsImage from "../assets/Electronics.jpg";
import AppliancesImage from "../assets/Appliances.jpg";
import FurnitureImage from "../assets/Furniture.jpg";

interface InventoryTableProps {
  data: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
}

const categoryImages: Record<string, string> = {
  Books: BooksImage,
  Clothing: ClothingImage,
  Electronics: ElectronicsImage,
  Appliances: AppliancesImage,
  Furniture: FurnitureImage,
};

const InventoryTable: React.FC<InventoryTableProps> = ({ data, onEdit, onDelete }) => {
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
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>SKU</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Quantity</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "right" }}>
              Price
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
                  src={categoryImages[item.category] || "https://via.placeholder.com/100?text=No+Image"}
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
