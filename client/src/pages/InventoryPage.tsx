import React, { useEffect, useState } from 'react';
import { getInventoryItems } from '../servives/inventoryService';
import { InventoryItem } from '../types/inventoryTypes';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        setData(response.data.content || []); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data.length > 0 ? (
        data.map((item: InventoryItem) => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
            <p>SKU: {item.sku}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
            <p>Category: {item.category}</p>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default InventoryPage;
