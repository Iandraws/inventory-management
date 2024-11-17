package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryItemRepository repository;

    public InventoryServiceImpl(InventoryItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<InventoryItem> getFilteredItems(String searchTerm, String category, Pageable pageable) {
        if ((searchTerm == null || searchTerm.trim().isEmpty()) && (category == null || category.trim().isEmpty())) {
            // No filters applied, return all items
            return repository.findAll(pageable);
        }

        if (category != null && !category.trim().isEmpty()) {
            if (searchTerm != null && !searchTerm.trim().isEmpty()) {
                // Filter by searchTerm (name or SKU) and category
                return repository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCaseAndCategory(
                        searchTerm.trim(), searchTerm.trim(), category.trim(), pageable);
            } else {
                // Filter only by category
                return repository.findByCategory(category.trim(), pageable);
            }
        }

        // Filter only by searchTerm (name or SKU)
        return repository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(
                searchTerm.trim(), searchTerm.trim(), pageable);
    }

    @Override
    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }

    @Override
    public Optional<InventoryItem> getItemById(Long id) {
        return repository.findById(id);
    }

    @Override
    public InventoryItem createItem(InventoryItem item) {
        return repository.save(item);
    }

    @Override
    public InventoryItem updateItem(Long id, InventoryItem item) {
        InventoryItem existingItem = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        existingItem.setName(item.getName());
        existingItem.setSku(item.getSku());
        existingItem.setQuantity(item.getQuantity());
        existingItem.setPrice(item.getPrice());
        existingItem.setCategory(item.getCategory());
        return repository.save(existingItem);
    }

    @Override
    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}
