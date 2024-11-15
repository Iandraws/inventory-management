package com.inventory.management.repository;

import com.inventory.management.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InventoryItemRepository
        extends JpaRepository<InventoryItem, Long>, JpaSpecificationExecutor<InventoryItem> {
    // JpaSpecificationExecutor enables dynamic queries
}
