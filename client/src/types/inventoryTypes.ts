export interface InventoryTableProps {
  data: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
  onOrderChange: (order: "asc" | "desc") => void;
}
export interface ItemFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: InventoryItem) => void;
  defaultValues?: Partial<InventoryItem>;
  mode: "add" | "edit";
}

export interface InventoryItem {
  id?: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
}
