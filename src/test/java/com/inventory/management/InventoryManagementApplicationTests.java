package com.inventory.management;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = InventoryManagementApplication.class)
@ActiveProfiles("test")
public class InventoryManagementApplicationTests {

    @Test
    public void contextLoads() {
    }
}
