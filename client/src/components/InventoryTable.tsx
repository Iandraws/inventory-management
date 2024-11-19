import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { InventoryTableProps } from "../types/inventoryTypes";

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

  const handleSort = (field: string) => {
    if (sortField === field) {
      onOrderChange(sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(field);
      onOrderChange("asc");
    }
  };

  if (isMobile) {
    return (
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {data.map((item) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>SKU:</strong> {item.sku}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Quantity:</strong> {item.quantity}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Price:</strong> {item.price.toFixed(2)} $
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Category:</strong> {item.category}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => onDelete(item.id!)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    );
  }

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
    <TableHead sx={{ backgroundColor: "#1565c0" }}>
      <TableRow>
        <TableCell
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 16px",
            width: "20%",
          }}
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
        <TableCell
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 16px",
            width: "15%",
          }}
        >
          SKU
        </TableCell>
        <TableCell
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 16px",
            width: "15%",
          }}
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
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 32px",
            textAlign: "right",
            width: "20%",
          }}
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
        <TableCell
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 32px",
            width: "25%",
          }}
        >
          Category
        </TableCell>
        <TableCell
          sx={{
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 16px",
            textAlign: "center",
            width: "15%",
          }}
        >
          Actions
        </TableCell>
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
          <TableCell sx={{ padding: "12px 16px" }}>
            <Typography variant="body1" fontWeight="medium">
              {item.name}
            </Typography>
          </TableCell>
          <TableCell sx={{ padding: "12px 16px" }}>
            <Typography variant="body2" color="textSecondary">
              {item.sku}
            </Typography>
          </TableCell>
          <TableCell sx={{ padding: "12px 16px" }}>
            <Typography variant="body2" color="textSecondary">
              {item.quantity}
            </Typography>
          </TableCell>
          <TableCell sx={{ padding: "12px 32px", textAlign: "right" }}>
            <Typography variant="body2" color="textSecondary">
              {item.price.toFixed(2)} $
            </Typography>
          </TableCell>
          <TableCell sx={{ padding: "12px 32px", pr: 4 }}> {/* Added margin */}
            <Typography
              variant="body2"
              sx={{
                backgroundColor: "#e3f2fd",
                padding: "4px 12px",
                borderRadius: "8px",
                textAlign: "center",
                display: "inline-block",
                fontWeight: "medium",
                marginRight: "20px", // Specific margin for additional spacing
              }}
            >
              {item.category}
            </Typography>
          </TableCell>
          <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
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
