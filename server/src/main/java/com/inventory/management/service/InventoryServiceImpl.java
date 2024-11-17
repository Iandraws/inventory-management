package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryItemRepository repository;

    public InventoryServiceImpl(InventoryItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<InventoryItem> getFilteredItems(String searchTerm, String category, Pageable pageable) {
        if ((searchTerm == null || searchTerm.trim().isEmpty()) &&
                (category == null || category.trim().isEmpty())) {
            return repository.findAll(pageable); // No filters applied, return all items
        }

        if (category != null && !category.trim().isEmpty() &&
                (searchTerm == null || searchTerm.trim().isEmpty())) {
            // Only category filter is applied
            return repository.findByCategoryContainingIgnoreCase(category.trim(), pageable);
        }

        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            // Exact match first
            Page<InventoryItem> exactMatches = repository.findByNameIgnoreCase(searchTerm.trim(), pageable);
            if (!exactMatches.isEmpty()) {
                return exactMatches;
            }

            // If no exact match is found, return partial matches
            return repository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(
                    searchTerm.trim(), searchTerm.trim(), pageable);
        }

        // If both filters are applied
        return repository.findByCategoryContainingIgnoreCaseAndNameContainingIgnoreCase(
                category.trim(), searchTerm.trim(), pageable);
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

    @Override
    public Optional<InventoryItem> getItemById(Long id) {
        return repository.findById(id);
    }
}
