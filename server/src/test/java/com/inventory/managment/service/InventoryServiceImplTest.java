package com.inventory.management.service;

import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InventoryServiceImplTest {

    @Mock
    private InventoryItemRepository repository;

    @InjectMocks
    private InventoryServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnAllItemsWhenNoFiltersApplied() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10);
        InventoryItem item = new InventoryItem();
        item.setId(1L);
        item.setName("Laptop");
        item.setSku("LPT123");
        item.setQuantity(10);
        item.setPrice(999.99);
        item.setCategory("Electronics");

        Page<InventoryItem> mockPage = new PageImpl<>(Collections.singletonList(item));
        when(repository.findAll(any(Pageable.class))).thenReturn(mockPage);

        // Act
        Page<InventoryItem> result = service.getFilteredItems(null, null, pageable, "name", "asc");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("Laptop", result.getContent().get(0).getName());
        verify(repository, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void shouldCreateNewItem() {
        InventoryItem item = new InventoryItem();
        item.setName("Phone");
        item.setSku("PHN123");
        item.setQuantity(15);
        item.setPrice(500.0);
        item.setCategory("Electronics");

        when(repository.save(any(InventoryItem.class))).thenReturn(item);

        InventoryItem result = service.createItem(item);

        assertNotNull(result);
        assertEquals("Phone", result.getName());
        assertEquals("PHN123", result.getSku());
        verify(repository, times(1)).save(item);
    }

    @Test
    void shouldThrowExceptionWhenItemNotFoundForUpdate() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> service.updateItem(1L, new InventoryItem()));

        assertEquals("Item not found", exception.getMessage());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void shouldUpdateExistingItem() {
        InventoryItem existingItem = new InventoryItem();
        existingItem.setId(1L);
        existingItem.setName("Laptop");
        existingItem.setSku("LPT123");
        existingItem.setQuantity(10);
        existingItem.setPrice(999.99);
        existingItem.setCategory("Electronics");

        InventoryItem updatedItem = new InventoryItem();
        updatedItem.setName("Updated Laptop");
        updatedItem.setSku("LPT456");
        updatedItem.setQuantity(20);
        updatedItem.setPrice(1199.99);
        updatedItem.setCategory("Electronics");

        when(repository.findById(1L)).thenReturn(Optional.of(existingItem));
        when(repository.save(any(InventoryItem.class))).thenReturn(existingItem);

        InventoryItem result = service.updateItem(1L, updatedItem);

        assertNotNull(result);
        assertEquals("Updated Laptop", result.getName());
        assertEquals("LPT456", result.getSku());
        assertEquals(20, result.getQuantity());
        assertEquals(1199.99, result.getPrice());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(existingItem);
    }

    @Test
    void shouldDeleteItem() {
        doNothing().when(repository).deleteById(1L);

        service.deleteItem(1L);

        verify(repository, times(1)).deleteById(1L);
    }
}
