import axiosInstance from './axiosInstance';

export const getInventoryItems = ({
  searchTerm = '',
  category = '',
  page = 0,
  size = 10,
  sortField = 'name',
  sortOrder = 'asc',
}: {
  searchTerm?: string;
  category?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
}) => {
  // Setup query params
  const params: Record<string, any> = {
    page,
    size,
    sortField,
    sortOrder,
  };

  // Add searchTerm to params if provided
  if (searchTerm.trim()) {
    params.searchTerm = searchTerm.trim();
  }

  // Add category to params if provided
  if (category) {
    params.category = category;
  }

  // Make the GET request with the query params
  return axiosInstance.get('/inventory', { params });
};

export const getInventoryItemById = (id: number) => axiosInstance.get(`/inventory/${id}`);

export const addInventoryItem = (item: any) => axiosInstance.post('/inventory', item);

export const updateInventoryItem = (id: number, item: any) => axiosInstance.put(`/inventory/${id}`, item);

export const deleteInventoryItem = (id: number) => axiosInstance.delete(`/inventory/${id}`);
