package com.inventory.management.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.management.model.InventoryItem;
import com.inventory.management.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InventoryController.class)
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InventoryService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllItems() throws Exception {
        // Arrange
        InventoryItem item1 = new InventoryItem();
        item1.setId(1L);
        item1.setName("Item 1");

        InventoryItem item2 = new InventoryItem();
        item2.setId(2L);
        item2.setName("Item 2");

        Page<InventoryItem> page = new PageImpl<>(List.of(item1, item2), PageRequest.of(0, 10), 2);

        when(service.getFilteredItems(any(), any(), any(), any())).thenReturn(page);

        // Act & Assert
        mockMvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.size()").value(2))
                .andExpect(jsonPath("$.content[0].name").value("Item 1"));
    }

    @Test
    void testGetItemById_Success() throws Exception {
        // Arrange
        InventoryItem item = new InventoryItem();
        item.setId(1L);
        item.setName("Item 1");

        when(service.getItemById(1L)).thenReturn(Optional.of(item));

        // Act & Assert
        mockMvc.perform(get("/api/inventory/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Item 1"));
    }

    @Test
    void testGetItemById_NotFound() throws Exception {
        // Arrange
        when(service.getItemById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/inventory/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateItem() throws Exception {
        // Arrange
        InventoryItem item = new InventoryItem();
        item.setName("New Item");
        item.setSku("ITEM001");
        item.setQuantity(50);
        item.setPrice(19.99);
        item.setCategory("Electronics");

        when(service.createItem(any())).thenReturn(item);

        // Act & Assert
        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Item"));
    }

    @Test
    void testDeleteItem() throws Exception {
        // Act & Assert
        mockMvc.perform(delete("/api/inventory/1"))
                .andExpect(status().isNoContent());

        verify(service, times(1)).deleteItem(1L);
    }
}
