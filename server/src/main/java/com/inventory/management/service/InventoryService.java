package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface InventoryService {
    Page<InventoryItem> getFilteredItems(String searchTerm, String category, Pageable pageable, String sortField,
            String sortOrder);

    InventoryItem createItem(InventoryItem item);

    InventoryItem updateItem(Long id, InventoryItem item);

    void deleteItem(Long id);

    Optional<InventoryItem> getItemById(Long id);
}
