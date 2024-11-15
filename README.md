
# Inventory Management System

## Overview
A full-stack inventory management system developed using a Spring Boot backend and a React/TypeScript frontend. The backend API enables CRUD operations on inventory items, and the frontend interacts with this API to fetch, display, and manage inventory data. This project emphasizes API design, database interactions, frontend development, and efficient state management.

## Backend Setup

### Requirements
- Java 17
- Maven
- PostgreSQL

### Setting Up the Project
1. Clone the repository:
    ```bash
    git clone <https://github.com/Iandraws/inventory-management>
    cd inventory-management
    cd server
    ```

2. Set up the PostgreSQL database. Update the `src/main/resources/application.properties` file with your database credentials:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/inventorydb
    spring.datasource.username=postgres
    spring.datasource.password=admin
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Build and run the project using Maven:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

### API Endpoints
The following endpoints are available in the backend API:

- **GET /api/inventory** - Retrieves a paginated list of inventory items, with optional query parameters for sorting, searching by name or SKU, and filtering by category.
- **POST /api/inventory** - Adds a new item to the inventory. Requires all fields to be valid.
- **GET /api/inventory/{id}** - Retrieves an item by its ID.
- **PUT /api/inventory/{id}** - Updates an existing item’s details by ID.
- **DELETE /api/inventory/{id}** - Deletes an item by ID.

#### Query Parameters for Sorting, Filtering, and Pagination
- **Sorting**: You can sort by `name`, `quantity`, or `price` by adding `sort=name` or similar in the query.
- **Filtering**: Use `name`, `sku`, and `category` as query parameters to filter the results.
- **Pagination**: Use `page` and `size` query parameters to paginate results (default is `page=0` and `size=10`).

### Example Requests
1. Retrieve all items, sorted by name:
    ```http
    GET /api/inventory?sort=name
    ```

2. Retrieve items with name containing "Laptop" and category "Electronics":
    ```http
    GET /api/inventory?name=Laptop&category=Electronics
    ```

3. Add a new item:
    ```http
    POST /api/inventory
    Content-Type: application/json

    {
      "name": "Wireless Keyboard",
      "sku": "KEY123",
      "quantity": 50,
      "price": 29.99,
      "category": "Accessories"
    }
    ```

### Error Handling
The backend includes custom exception handling for various cases:
- **Item Not Found**: Returns `404 Not Found` if an item with a specified ID does not exist.
- **Validation Errors**: Returns `400 Bad Request` if there are validation issues with the data (e.g., missing required fields).
- **Database Errors**: Handles common database-related errors gracefully.

### Testing
The backend includes both unit and integration tests:
- **Unit Tests**: Cover the service layer to ensure business logic and validation are working as expected.
- **Integration Tests**: Cover the controller layer to test the API endpoints.

To run the tests, execute:
```bash
mvn test
```

## Additional Notes
- The project uses Spring Boot `3.3.5` and Java `17`.
- Maven is used for dependency management and project build.
- PostgreSQL is used as the database.
- Spring Data JPA is used for data access, with specifications for dynamic queries.

### Future Enhancements
- Implement caching to improve performance.
- Add more complex filtering options.
- Integrate WebSocket support for real-time updates.

---
