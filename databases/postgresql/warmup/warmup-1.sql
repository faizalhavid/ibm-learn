

-- SQL STUDY CASE
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name varchar(125) NOT NULL,
	bio TEXT NULL
);


CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR(125) NOT NULL,
	price NUMERIC(8,2),
	stock INT,
	published_year INT,
	author_id INT REFERENCES authors(id) ON DELETE CASCADE,
	category varchar(125)
);


CREATE TABLE customers (
	id SERIAL PRIMARY KEY,
	name VARCHAR(125) NOT NULL,
	email VARCHAR(125) NOT NULL UNIQUE,
	registered_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
	order_date DATE DEFAULT CURRENT_DATE,
	total_amount NUMERIC(8,2) DEFAULT 0
);

ALTER TABLE orders ALTER COLUMN total_amount TYPE NUMERIC(12,2);

CREATE TABLE order_items (
	order_id INT REFERENCES orders(id) ON DELETE SET NULL,
	book_id INT REFERENCES books(id) ON DELETE SET null,
	quantity INT DEFAULT 0,
	price_each NUMERIC(8,2),
	
	primary key (order_id, book_id)
);




drop table bookstore.public.authors cascade;
drop table bookstore.public.books cascade;
drop table bookstore.public.orders;
drop table bookstore.public.customers;
drop table bookstore.order_items;


INSERT INTO bookstore.public.authors(name,bio)
VALUES 
	('Mukidi As-Syahrur', 'Lorem ipsum'),
	('Hundali Ahamad', 'Lorem ipsum'),
	('Wakotani', 'Lorem ipsum')
;

INSERT INTO bookstore.public.books(title, price, stock, published_year, author_id, category)
VALUES
	('Cawe Cawe Presiden Jokowi Dodo', 75000, 100, 2024, 1, 'politik'),
	('Mie Ayam Terakhir', 65000, 100, 2025, 1, 'novel'),
	('10 Dosa Soeharto Soeharto', 200000, 100, 2005, 1, 'sejarah' ),
	('Design Pattern' , 350000, 100, 2013, 1, 'teknologi' ),
	('Clean Code', 287000, 100, 2013, 1, 'teknologi'),
	
	('Agile', 400000 , 100, 20, 2, 'teknologi' ),
	('Dari Penjara Ke Penjara', 105000 , 100, 2012, 2 ,'sejarah'),
	('Sejarah Jawa Timur', 45000, 100 , 2021, 2 ,'sejarah'),
	('Kisah Sangkuriang', 55000, 100, 2001, 2 ,'sejarah'),
	('1001 Kota Mimpi', 34500, 100, 2002, 2, 'sejarah'),
	
	('Matematika dalam 10 Jam', 80000, 100, 2012, 3, 'pendidikan'),
	('Psikologi Uang', 253500, 100, 2000, 3,  'pendidikan'),
	('Sejarah SMA Kelas XI', 124000, 100, 2025, 3, 'pendidikan'),
	('Naruto Shipuden Vol 1', 78000, 100, 1999, 3, 'komik'),
	('Budidaya Lele', 20000, 100, 2001, 3, 'flora fauna')
;

INSERT INTO bookstore.public.customers(name,email)
VALUES
	('budi', 'budi@mail.com'),
	('yudho', 'yudho@mail.com'),
	('once', 'oncemaik@mail.com')
;


INSERT INTO bookstore.public.orders(customer_id, total_amount)
VALUES

--	book_id : 1,2
	(1, 140000),
--  book_id : 15,10
	(2, 54500),
--  book_id : 6, amount 10
	(2, 4000000)	
;

INSERT INTO bookstore.public.order_items(order_id, book_id, quantity, price_each)
VALUES
	(1, 1, 1, 75000),
	(1, 2, 1, 65000),
	(2, 15, 1, 34500),
	(2, 10, 1, 20000),
	(3, 6, 10, 400000)
;


SELECT a.name, b.title 
FROM books b 
INNER JOIN authors a ON b.author_id = a.id
ORDER BY b.published_year DESC
;

SELECT b.title, o.* 
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN books b ON oi.book_id = b.id
WHERE c.name ilike 'budi'
;


SELECT b.title,oi.* 
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN books b ON oi.book_id = b.id
WHERE o.id = 1
;


SELECT SUM(o.total_amount) "total pendapatan"
FROM orders o;


SELECT b.title, oi.quantity
FROM order_items oi
JOIN books b ON oi.book_id = b.id
ORDER BY quantity desc
LIMIT 3
;



SELECT b.title, sum(oi.quantity) AS pendapatan
FROM order_items oi 
INNER JOIN books b ON oi.book_id = b.id
GROUP BY b.id  
ORDER BY pendapatan DESC 
LIMIT 3
;

SELECT c.*,sum(oi.quantity) total_buku
FROM order_items oi 
INNER JOIN orders o ON o.id = oi.order_id 
INNER JOIN customers c ON c.id = o.customer_id
GROUP BY c.id,oi.quantity 
HAVING oi.quantity > 3
;


CREATE OR REPLACE  VIEW best_selling_books AS 
SELECT b.id, b.title,sum(oi.quantity) terjual
FROM order_items oi 
INNER JOIN books b ON b.id = oi.book_id
GROUP BY b.id, oi.quantity 
ORDER BY terjual DESC 
;
SELECT * FROM best_selling_books ;


WITH customer_high_total_price AS (
	SELECT o.customer_id, sum(o.total_amount) total_price
	FROM orders o
	GROUP BY o.customer_id 
	ORDER BY total_price DESC 
	LIMIT 1
)
SELECT c.name
FROM customers c 
WHERE c.id = (SELECT c.id FROM customer_high_total_price);





WITH customer_high_total_price AS (
	SELECT o.customer_id, sum(o.total_amount) total_price
	FROM orders o
	GROUP BY o.customer_id 
	ORDER BY total_price DESC 
	LIMIT 1
)
SELECT c.name
FROM customers c 
WHERE c.id = (SELECT c.id FROM customer_high_total_price);


SELECT b.title,
o.total_amount,
RANK() OVER (ORDER BY o.total_amount DESC) as rank
FROM order_items oi
INNER JOIN orders o on o.id = oi.order_id
INNER JOIN books b on b.id = oi.book_id;



UPDATE books b
SET stock = b.stock + 100
FROM order_items oi
WHERE b.id = oi.book_id;


CREATE TRIGGER update_book_stock
AFTER INSERT ON order
FOR EACH ROW
BEGIN
	UPDATE books b 
	SET b.stock = b.stock - oi.quantity
	INNER JOIN order_items oi on oi.id = b.id
END;


CREATE OR REPLACE FUNCTION update_book_stock()
RETURNS trigger as $$
BEGIN
	UPDATE books b
	SET stock = stock - oi.quantity
	FROM order_items oi
	WHERE oi.book_id = b.id;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trigger_insert_log
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_book_stock();


-- Drop the trigger
DROP TRIGGER IF EXISTS trigger_insert_log ON order_items;

-- Drop the function
DROP FUNCTION IF EXISTS update_book_stock();





INSERT INTO orders(customer_id, total_amount)
VALUES
--	book_id : 1,2
	(1, 140000),
--  book_id : 15,10
	(2, 54500),
--  book_id : 6, amount 10
	(2, 4000000)
;

SELECT * FROM orders;

INSERT INTO order_items(order_id, book_id, quantity, price_each)
VALUES
	(<newId>, 1, 1, 75000),
	(<newId>, 2, 1, 65000),
	(<newId>, 15, 1, 34500),
	(<newId>, 10, 1, 20000),
	(<newId>, 6, 10, 400000)
;

SELECT * FROM books;



ALTER TABLE order_items
DROP CONSTRAINT IF EXISTS order_items_book_id_fkey;

ALTER TABLE order_items
ADD CONSTRAINT order_items_book_id_fkey
FOREIGN KEY (book_id)
REFERENCES books(id)
ON DELETE CASCADE;