
import axiosInstance from './axiosInstance';

export const getInventoryItems = ({
  searchTerm = '',
  category = '',
  page = 0,
  size = 10,
  sort = 'name,asc',
}: {
  searchTerm?: string;
  category?: string;
  page?: number;
  size?: number;
  sort?: string;
}) => {
  const params: Record<string, any> = {
    page,
    size,
    sort,
  };

  if (searchTerm.trim()) {
    params.searchTerm = searchTerm.trim(); // Send only if it's not empty
  }

  if (category) {
    params.category = category;
  }

  return axiosInstance.get('/inventory', { params });
};

export const getInventoryItemById = (id: number) => axiosInstance.get(`/inventory/${id}`);

export const addInventoryItem = (item: any) => axiosInstance.post('/inventory', item);

export const updateInventoryItem = (id: number, item: any) => axiosInstance.put(`/inventory/${id}`, item);

export const deleteInventoryItem = (id: number) => axiosInstance.delete(`/inventory/${id}`);
