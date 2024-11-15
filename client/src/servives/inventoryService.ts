
import axiosInstance from './axiosInstance';

export const getInventoryItems = () => axiosInstance.get('/inventory');

export const getInventoryItemById = (id: number) => axiosInstance.get(`/inventory/${id}`);

export const addInventoryItem = (item: any) => axiosInstance.post('/inventory', item);

export const updateInventoryItem = (id: number, item: any) => axiosInstance.put(`/inventory/${id}`, item);

export const deleteInventoryItem = (id: number) => axiosInstance.delete(`/inventory/${id}`);
