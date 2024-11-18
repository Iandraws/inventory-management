import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import ItemForm from "../components/ItemForm";
import SearchBar from "../components/SearchBar";
import InventoryTable from "../components/InventoryTable";
import {
  addInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  updateInventoryItem,
} from "../services/inventoryService";
import { InventoryItem } from "../types/inventoryTypes";

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filtering, sorting, and pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Dialog and form states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem> | null>(
    null
  );

  // Ref for debounce
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch data
  const fetchData = async (
    searchTerm: string,
    category: string,
    page: number,
    size: number,
    sortField: string,
    sortOrder: string
  ) => {
    setLoading(true);
    try {
      const response = await getInventoryItems({
        searchTerm,
        category,
        page,
        size,
        sort: `${sortField},${sortOrder}`,
      });

      const items = response.data.content || [];
      setData(items);
      setTotalPages(response.data.totalPages);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchData(
        searchQuery,
        categoryFilter,
        currentPage,
        pageSize,
        sortField,
        sortOrder
      );
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [
    searchQuery,
    categoryFilter,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
  ]);

  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setSuccessMessage("Item deleted successfully.");
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the item.");
    }
  };

  const handleAddOrEdit = async (item: InventoryItem) => {
    if (formMode === "add") {
      try {
        const response = await addInventoryItem(item);
        setData((prevData) => [...prevData, response.data]);
        setSuccessMessage("Item added successfully.");
      } catch (err: any) {
        setError(err.message || "An error occurred while adding the item.");
      }
    } else if (formMode === "edit" && item.id) {
      try {
        const response = await updateInventoryItem(item.id, item);
        setData((prevData) =>
          prevData.map((i) => (i.id === response.data.id ? response.data : i))
        );
        setSuccessMessage("Item updated successfully.");
      } catch (err: any) {
        setError(err.message || "An error occurred while editing the item.");
      }
    }
    setDialogOpen(false);
  };

  const openAddForm = () => {
    setFormMode("add");
    setCurrentItem(null);
    setDialogOpen(true);
  };

  const openEditForm = (item: InventoryItem) => {
    setFormMode("edit");
    setCurrentItem(item);
    setDialogOpen(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page - 1);
  };

  const closeSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 2,
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setCurrentPage(0);
            setSearchQuery(value);
          }}
          categoryFilter={categoryFilter}
          onCategoryChange={(value) => {
            setCurrentPage(0);
            setCategoryFilter(value);
          }}
          sortField={sortField}
          onSortChange={(value) => {
            setCurrentPage(0);
            setSortField(value);
          }}
          sortOrder={sortOrder}
          onOrderChange={(value) => {
            setCurrentPage(0);
            setSortOrder(value);
          }}
          onAddClick={openAddForm}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="h6" align="center">
            {error}
          </Typography>
        ) : (
          <InventoryTable
            data={data}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      </Box>

      {/* Form Dialog */}
      <ItemForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddOrEdit}
        defaultValues={currentItem || undefined}
        mode={formMode}
      />

      {/* Error and Success Messages */}
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      >
        {error ? (
          <Alert
            onClose={closeSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        ) : (
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default InventoryPage;
