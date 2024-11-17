
package com.inventory.management.repository;

import com.inventory.management.model.InventoryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

        // Find by exact name (case-insensitive)
        Page<InventoryItem> findByNameIgnoreCase(String name, Pageable pageable);

        // Find by partial name or SKU (case-insensitive)
        Page<InventoryItem> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku,
                        Pageable pageable);

        // Find by category (case-insensitive)
        Page<InventoryItem> findByCategoryContainingIgnoreCase(String category, Pageable pageable);

        // Find by category and partial name (case-insensitive)
        Page<InventoryItem> findByCategoryContainingIgnoreCaseAndNameContainingIgnoreCase(
                        String category, String name, Pageable pageable);
}