## SQL Warmup: Online Bookstore Management System

### 🧠 Case Study
An online bookstore wants to build a database system to manage:
- Books and categories
- Book authors
- Customers
- Purchase transactions
- Customer reviews

---

### 🔰 Phase 1: Creating Database Structure (DDL)

#### Task 1.1
Create a database named `BookStore`.

#### Task 1.2
Create a table `Authors` with the following columns:
- `author_id` (PK, AUTO_INCREMENT)
- `name` (varchar, required)
- `bio` (text, optional)

#### Task 1.3
Create a table `Books` with the following structure:
- `book_id` (PK, AUTO_INCREMENT)
- `title` (varchar, required)
- `price` (decimal)
- `stock` (int)
- `published_year` (int)
- `author_id` (FK to `Authors`)
- `category` (varchar)

#### Task 1.4
Create a table `Customers`:
- `customer_id` (PK, AUTO_INCREMENT)
- `name` (varchar)
- `email` (varchar, unique)
- `registered_at` (date)

#### Task 1.5
Create a table `Orders`:
- `order_id` (PK, AUTO_INCREMENT)
- `customer_id` (FK to `Customers`)
- `order_date` (date)
- `total_amount` (decimal)

#### Task 1.6
Create a table `OrderItems`:
- `order_id` (FK to `Orders`)
- `book_id` (FK to `Books`)
- `quantity` (int)
- `price_each` (decimal)
- Combination of `order_id` and `book_id` as PK

---

### 📥 Phase 2: Data Insertion (DML)

#### Task 2.1
Insert 3 authors into the `Authors` table.

#### Task 2.2
Insert at least 5 books from 2 different authors.

#### Task 2.3
Insert 3 customers.

#### Task 2.4
Simulate 2 order transactions by different customers. Ensure each order has more than 1 item.

---

### 🔎 Phase 3: Basic Queries (SELECT, JOIN)

#### Task 3.1
Display a list of all books along with their authors' names.

#### Task 3.2
Display all orders made by a customer named "Budi," including the date and total amount.

#### Task 3.3
Display all items in a specific order (e.g., `order_id = 1`) along with the book names and unit prices.

---

### 📊 Phase 4: Intermediate Queries (GROUP BY, HAVING, LIKE, SUBQUERY)

#### Task 4.1
Display the total revenue of the store from all orders.

#### Task 4.2
Display the top 3 most ordered books (based on total quantity).

#### Task 4.3
Display customers who have ordered more than 3 books in a single order.

---

### 🧩 Phase 5: Advanced Queries (VIEW, CTE, WINDOW FUNCTION)

#### Task 5.1
Create a VIEW `best_selling_books` containing `book_id`, `title`, and total quantity sold.

#### Task 5.2
Use a CTE to display the customer with the highest total spending.

#### Task 5.3
Use `RANK()` to rank books based on the highest sales.

---

### ⚙️ Phase 6: Advanced Manipulation (UPDATE, DELETE, TRIGGER)

#### Task 6.1
Update the book stock whenever a new order is placed (simulate with a direct UPDATE).

#### Task 6.2
Create a TRIGGER to automatically reduce book stock after `OrderItems` data is added.

#### Task 6.3
Delete a specific author and all their books in a cascading manner (use `ON DELETE CASCADE`).
