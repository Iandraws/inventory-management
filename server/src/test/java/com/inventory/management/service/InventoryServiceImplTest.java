package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InventoryServiceImplTest {

    private InventoryItemRepository repository;
    private InventoryServiceImpl service;

    @BeforeEach
    void setUp() {
        repository = mock(InventoryItemRepository.class);
        service = new InventoryServiceImpl(repository);
    }

    @Test
    void testGetAllItems() {
        // Arrange
        InventoryItem item1 = new InventoryItem();
        item1.setName("Item 1");

        InventoryItem item2 = new InventoryItem();
        item2.setName("Item 2");

        when(repository.findAll()).thenReturn(List.of(item1, item2));

        // Act
        List<InventoryItem> items = service.getAllItems();

        // Assert
        assertEquals(2, items.size());
        assertEquals("Item 1", items.get(0).getName());
    }

    @Test
    void testGetItemById_Success() {
        // Arrange
        InventoryItem item = new InventoryItem();
        item.setId(1L);
        item.setName("Item 1");

        when(repository.findById(1L)).thenReturn(Optional.of(item));

        // Act
        Optional<InventoryItem> foundItem = service.getItemById(1L);

        // Assert
        assertTrue(foundItem.isPresent());
        assertEquals("Item 1", foundItem.get().getName());
    }

    @Test
    void testGetItemById_NotFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<InventoryItem> foundItem = service.getItemById(1L);

        // Assert
        assertFalse(foundItem.isPresent());
    }

    @Test
    void testCreateItem() {
        // Arrange
        InventoryItem item = new InventoryItem();
        item.setName("New Item");

        when(repository.save(item)).thenReturn(item);

        // Act
        InventoryItem createdItem = service.createItem(item);

        // Assert
        assertNotNull(createdItem);
        assertEquals("New Item", createdItem.getName());
        verify(repository, times(1)).save(item);
    }

    @Test
    void testUpdateItem() {
        // Arrange
        InventoryItem existingItem = new InventoryItem();
        existingItem.setId(1L);
        existingItem.setName("Old Name");

        InventoryItem updatedItem = new InventoryItem();
        updatedItem.setName("Updated Name");
        updatedItem.setQuantity(100);

        when(repository.findById(1L)).thenReturn(Optional.of(existingItem));
        when(repository.save(existingItem)).thenReturn(existingItem);

        // Act
        InventoryItem result = service.updateItem(1L, updatedItem);

        // Assert
        assertEquals("Updated Name", result.getName());
        assertEquals(100, result.getQuantity());
    }

    @Test
    void testDeleteItem() {
        // Act
        service.deleteItem(1L);

        // Assert
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testGetFilteredItems() {
        // Arrange
        InventoryItem item1 = new InventoryItem();
        item1.setName("Item 1");
        item1.setCategory("Category 1");

        Pageable pageable = PageRequest.of(0, 10);
        Page<InventoryItem> page = new PageImpl<>(List.of(item1), pageable, 1);

        // Mock the findAll method with a Specification and Pageable
        when(repository.findAll(ArgumentMatchers.<Specification<InventoryItem>>any(), eq(pageable))).thenReturn(page);

        // Act
        Page<InventoryItem> result = service.getFilteredItems("Item 1", null, "Category 1", pageable);

        // Assert
        assertEquals(1, result.getTotalElements());
        assertEquals("Item 1", result.getContent().get(0).getName());
    }
}
