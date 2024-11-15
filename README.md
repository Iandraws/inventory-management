# Inventory Management System - Backend

This is the backend for the Inventory Management System, built with Spring Boot. It provides a RESTful API for managing inventory items, including functionality for creating, reading, updating, and deleting items. The backend connects to a PostgreSQL database and includes validation, pagination, sorting, and filtering capabilities.

## Project Structure

The backend code is located in the `server` directory and organized into standard Spring Boot packages:

- `controller/` - Contains REST API controllers.
- `service/` - Contains the business logic layer.
- `repository/` - Contains database interaction code using Spring Data JPA.
- `model/` - Contains entity classes representing database tables.
- `resources/` - Contains application configuration files (e.g., `application.properties`).

## Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management/server
Configure PostgreSQL Database

Make sure PostgreSQL is installed and running. Create a database named inventorydb and update the database credentials in src/main/resources/application.properties:

properties
Code kopieren
spring.datasource.url=jdbc:postgresql://localhost:5432/inventorydb
spring.datasource.username=your-username
spring.datasource.password=your-password
Build the Project

Use Maven to build the project:

bash
Code kopieren
mvn clean install
Run the Application

Start the Spring Boot application:

bash
Code kopieren
mvn spring-boot:run
The application will start on http://localhost:8080.

API Endpoints
The following endpoints are available in the backend API:

GET /api/inventory - Retrieves a paginated list of inventory items, with optional query parameters for sorting, searching by name or sku, and filtering by category.
POST /api/inventory - Adds a new item to the inventory. Requires all fields to be valid.
GET /api/inventory/{id} - Retrieves an item by its ID.
PUT /api/inventory/{id} - Updates an existing item’s details by ID.
DELETE /api/inventory/{id} - Deletes an item by ID.
Query Parameters for Sorting, Filtering, and Pagination
Sorting: You can sort by name, quantity, or price by adding sort=name or similar in the query.
Filtering: Use name, sku, and category as query parameters to filter the results.
Pagination: Use page and size query parameters to paginate results (default is page=0 and size=10).
Example Requests
Retrieve all items, sorted by name:

http
Code kopieren
GET /api/inventory?sort=name
Retrieve items with name containing "Laptop" and category "Electronics":

http
Code kopieren
GET /api/inventory?name=Laptop&category=Electronics
Add a new item:

http
Code kopieren
POST /api/inventory
Content-Type: application/json

{
  "name": "Wireless Keyboard",
  "sku": "KEY123",
  "quantity": 50,
  "price": 29.99,
  "category": "Accessories"
}
Error Handling
The backend includes custom exception handling for various cases:

Item Not Found: Returns 404 Not Found if an item with a specified ID does not exist.
Validation Errors: Returns 400 Bad Request if there are validation issues with the data (e.g., missing required fields).
Database Errors: Handles common database-related errors gracefully.
Testing
The backend includes both unit and integration tests:

Unit Tests: Cover the service layer to ensure business logic and validation are working as expected.
Integration Tests: Cover the controller layer to test the API endpoints.
To run the tests, execute:

bash
Code kopieren
mvn test
Additional Notes
The project uses Spring Boot 3.3.5 and Java 17.
Maven is used for dependency management and project build.
PostgreSQL is used as the database.
Spring Data JPA is used for data access, with specifications for dynamic queries.
Future Enhancements
Implement caching to improve performance.
Add more complex filtering options.
Integrate WebSocket support for real-time updates.
