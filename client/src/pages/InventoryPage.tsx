// src/pages/InventoryPage.tsx
import React, { useEffect, useState } from 'react';
import { getInventoryItems } from '../servives/inventoryService';

const InventoryPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryItems();
        setData(response.data);
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
      {data?.content?.length > 0 ? (
        data.content.map((item: any) => (
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
