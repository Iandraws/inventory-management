package com.inventory.management.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.management.model.InventoryItem;
import com.inventory.management.repository.InventoryItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class InventoryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InventoryItemRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        repository.deleteAll(); // Clean the database before each test
    }

    @Test
    void shouldCreateNewItem() throws Exception {
        InventoryItem item = new InventoryItem(null, "Tablet", "TAB123", 20, 300.0, "Electronics");

        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tablet"))
                .andExpect(jsonPath("$.sku").value("TAB123"))
                .andExpect(jsonPath("$.quantity").value(20))
                .andExpect(jsonPath("$.price").value(300.0))
                .andExpect(jsonPath("$.category").value("Electronics"));
    }

    @Test
    void shouldGetAllItems() throws Exception {
        InventoryItem item = new InventoryItem(null, "Monitor", "MON123", 5, 150.0, "Electronics");
        repository.save(item);

        mockMvc.perform(get("/api/inventory")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Monitor"))
                .andExpect(jsonPath("$.content[0].sku").value("MON123"))
                .andExpect(jsonPath("$.content[0].quantity").value(5))
                .andExpect(jsonPath("$.content[0].price").value(150.0))
                .andExpect(jsonPath("$.content[0].category").value("Electronics"));
    }

    @Test
    void shouldReturn404WhenItemNotFound() throws Exception {
        mockMvc.perform(get("/api/inventory/999")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateItem() throws Exception {
        InventoryItem item = repository.save(new InventoryItem(null, "Mouse", "MOU123", 10, 25.0, "Electronics"));

        InventoryItem updatedItem = new InventoryItem(item.getId(), "Gaming Mouse", "MOU124", 15, 50.0, "Electronics");

        mockMvc.perform(put("/api/inventory/" + item.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedItem)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Gaming Mouse"))
                .andExpect(jsonPath("$.sku").value("MOU124"))
                .andExpect(jsonPath("$.quantity").value(15))
                .andExpect(jsonPath("$.price").value(50.0));
    }

    @Test
    void shouldDeleteItem() throws Exception {
        InventoryItem item = repository.save(new InventoryItem(null, "Keyboard", "KEY123", 15, 45.0, "Electronics"));

        mockMvc.perform(delete("/api/inventory/" + item.getId()))
                .andExpect(status().isNoContent());

        Optional<InventoryItem> deletedItem = repository.findById(item.getId());
        assertTrue(deletedItem.isEmpty(), "The item should be deleted from the database");
    }
}
