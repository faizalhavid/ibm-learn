## SQL Warmup: Movie Rental Management System

### 🧠 Case Study
A movie rental service wants to build a database system to manage:
- Movies and genres
- Movie directors
- Customers
- Rental transactions
- Customer reviews

---

### 🔰 Phase 1: Creating Database Structure (DDL)

#### Task 1.1
Create a database named `MovieRental`.

#### Task 1.2
Create a table `Directors` with the following columns:
- `director_id` (PK, AUTO_INCREMENT)
- `name` (varchar, required)
- `bio` (text, optional)

#### Task 1.3
Create a table `Movies` with the following structure:
- `movie_id` (PK, AUTO_INCREMENT)
- `title` (varchar, required)
- `release_year` (int)
- `rating` (decimal)
- `stock` (int)
- `director_id` (FK to `Directors`)
- `genre` (varchar)

#### Task 1.4
Create a table `Customers`:
- `customer_id` (PK, AUTO_INCREMENT)
- `name` (varchar)
- `email` (varchar, unique)
- `registered_at` (date)

#### Task 1.5
Create a table `Rentals`:
- `rental_id` (PK, AUTO_INCREMENT)
- `customer_id` (FK to `Customers`)
- `rental_date` (date)
- `return_date` (date)
- `total_amount` (decimal)

#### Task 1.6
Create a table `RentalItems`:
- `rental_id` (FK to `Rentals`)
- `movie_id` (FK to `Movies`)
- `quantity` (int)
- `price_each` (decimal)
- Combination of `rental_id` and `movie_id` as PK

---

### 📥 Phase 2: Data Insertion (DML)

#### Task 2.1
Insert 3 directors into the `Directors` table.

#### Task 2.2
Insert at least 5 movies from 2 different directors.

#### Task 2.3
Insert 3 customers.

#### Task 2.4
Simulate 2 rental transactions by different customers. Ensure each rental has more than 1 item.

---

### 🔎 Phase 3: Basic Queries (SELECT, JOIN)

#### Task 3.1
Display a list of all movies along with their directors' names.

#### Task 3.2
Display all rentals made by a customer named "Alice," including the rental date and total amount.

#### Task 3.3
Display all items in a specific rental (e.g., `rental_id = 1`) along with the movie titles and unit prices.

---

### 📊 Phase 4: Intermediate Queries (GROUP BY, HAVING, LIKE, SUBQUERY)

#### Task 4.1
Display the total revenue of the rental service from all rentals.

#### Task 4.2
Display the top 3 most rented movies (based on total quantity).

#### Task 4.3
Display customers who have rented more than 5 movies in a single rental.

---

### 🧩 Phase 5: Advanced Queries (VIEW, CTE, WINDOW FUNCTION)

#### Task 5.1
Create a VIEW `most_rented_movies` containing `movie_id`, `title`, and total quantity rented.

#### Task 5.2
Use a CTE to display the customer with the highest total spending on rentals.

#### Task 5.3
Use `RANK()` to rank movies based on the highest rental counts.

---

### ⚙️ Phase 6: Advanced Manipulation (UPDATE, DELETE, TRIGGER)

#### Task 6.1
Update the movie stock whenever a new rental is placed (simulate with a direct UPDATE).

#### Task 6.2
Create a TRIGGER to automatically reduce movie stock after `RentalItems` data is added.

#### Task 6.3
Delete a specific director and all their movies in a cascading manner (use `ON DELETE CASCADE`).


