package com.inventory.management.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.inventory.management.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

        Page<InventoryItem> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku,
                        Pageable pageable);

        Page<InventoryItem> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCaseAndCategory(String name, String sku,
                        String category, Pageable pageable);

        Page<InventoryItem> findByCategory(String category, Pageable pageable);
}
