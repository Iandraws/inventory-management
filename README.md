
# Inventory Management System

## Overview
This is a full-stack inventory management system featuring a Spring Boot backend and a React/TypeScript frontend. The application supports CRUD operations on inventory items and incorporates efficient state management, validation, and user-friendly interfaces. 

The project demonstrates robust API design, seamless frontend-backend integration, and database management using PostgreSQL.

---

## Backend Setup

### Requirements
- **Java 23**
- **Maven**
- **PostgreSQL**

### Setting Up the Backend
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Iandraws/inventory-management.git
   cd inventory-management/server
   ```

2. **Database Configuration**:
   Update the `application.properties` file at `src/main/resources/` with your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/inventorydb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and Run**:
   Build and run the backend using Maven:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Backend API Overview
The backend provides a RESTful API with the following endpoints:

#### Inventory Endpoints
- **GET /api/inventory**  
  Retrieves a paginated list of inventory items with support for sorting, filtering, and searching.
  
- **POST /api/inventory**  
  Adds a new item to the inventory. Expects a valid JSON payload with all required fields.

- **GET /api/inventory/{id}**  
  Retrieves a single inventory item by its ID.

- **PUT /api/inventory/{id}**  
  Updates an existing inventory item by ID. Requires a valid JSON payload with updated fields.

- **DELETE /api/inventory/{id}**  
  Deletes an inventory item by its ID.

### Design Decisions
- **Spring Boot**: Chosen for its ease of use and robust ecosystem.
- **Spring Data JPA**: Used to handle dynamic queries and simplify database access.
- **Validation**: Implemented using `javax.validation` annotations for input data integrity.

### Challenges
- Implementing dynamic filtering and sorting for complex queries.


### Testing
- **Unit Tests**: Test service-layer business logic, validation, and exception handling.
- **Integration Tests**: Verify the API endpoints and database interactions.
  


To run the tests:
```bash
mvn test
```

---

## Frontend Setup

### Requirements
- **Node.js** (>=16.x)
- **npm** or **yarn**

### Setting Up the Frontend
1. **Navigate to the frontend directory**:
   ```bash
   cd inventory-management/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The app will run at [http://localhost:3000](http://localhost:3000).

### Frontend Features
- **Search and Filter**: Users can search inventory items by name or SKU and filter by category.
- **Sorting**: Items can be sorted by name, quantity, or price.
- **Add/Edit/Delete**: Users can perform CRUD operations seamlessly through a modern UI.
- **Responsive Design**: The application is fully responsive for both desktop and mobile devices.

### Libraries Used
- **React with TypeScript**: For building scalable and maintainable UI components.
- **Material-UI**: For a consistent, responsive, and accessible design.
-  **Axios with axiosInstance**: For API communication. Centralized in a reusable `axiosInstance` for consistent base URL, headers, and error handling.

### Testing
- ** unit tests**: focusing on individual React components, event handling, and rendering logic.

### Challenges
- Implementing efficient state management and form validation.
- Achieving responsiveness while maintaining consistent design.

---

## Example API Usage

### Fetch Items
Retrieve all inventory items, sorted by name:
```http
GET /api/inventory?sort=name&page=0&size=10
```

### Add a New Item
Add a new inventory item:
```http
POST /api/inventory
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "sku": "MOUSE123",
  "quantity": 25,
  "price": 19.99,
  "category": "Accessories"
}
```

### Update an Item
Update an existing item by ID:
```http
PUT /api/inventory/1
Content-Type: application/json

{
  "name": "Gaming Mouse",
  "sku": "MOUSE123",
  "quantity": 20,
  "price": 29.99,
  "category": "Accessories"
}
```

### Delete an Item
Delete an item by ID:
```http
DELETE /api/inventory/1
```

---

