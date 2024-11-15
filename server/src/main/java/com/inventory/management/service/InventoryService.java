package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface InventoryService {
    Page<InventoryItem> getFilteredItems(String name, String sku, String category, Pageable pageable);

    List<InventoryItem> getAllItems();

    Optional<InventoryItem> getItemById(Long id);

    InventoryItem createItem(InventoryItem item);

    InventoryItem updateItem(Long id, InventoryItem item);

    void deleteItem(Long id);
}
