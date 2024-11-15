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
    public Page<InventoryItem> getFilteredItems(String name, String sku, String category, Pageable pageable) {
        Specification<InventoryItem> spec = (root, query, criteriaBuilder) -> {
            var predicates = criteriaBuilder.conjunction();

            if (name != null && !name.isEmpty()) {
                predicates = criteriaBuilder.and(predicates, criteriaBuilder.like(root.get("name"), "%" + name + "%"));
            }
            if (sku != null && !sku.isEmpty()) {
                predicates = criteriaBuilder.and(predicates, criteriaBuilder.like(root.get("sku"), "%" + sku + "%"));
            }
            if (category != null && !category.isEmpty()) {
                predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("category"), category));
            }

            return predicates;
        };

        return repository.findAll(Specification.where(spec), pageable);
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
