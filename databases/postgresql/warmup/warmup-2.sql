--CREATE DATABASE MovieRental;
--CREATE SCHEMA IF NOT EXISTS dev;
--SHOW search_path;
--SET search_path TO dev;
--DROP TABLE IF EXISTS directors;

CREATE TABLE directors (
	id   serial	PRIMARY KEY ,
	name varchar(125) NOT NULL,
	bio   text NULL
);

--DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
	id serial PRIMARY KEY,
	title varchar(125) NOT NULL,
	release_year INTEGER DEFAULT 1900,
	rating decimal (2,1),
	stock INTEGER DEFAULT 0,
	director_id INTEGER REFERENCES directors(id) ON DELETE CASCADE,
	genre varchar(60)
);

--DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
	id serial PRIMARY KEY,
	name varchar(125),
	email varchar(125) UNIQUE,
	registered_at date DEFAULT CURRENT_DATE
);

--DROP TABLE IF EXISTS orders;
CREATE TABLE rentals(
	id serial PRIMARY KEY,
	customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
	rental_date date DEFAULT CURRENT_DATE,
	return_date date NULL,
	total_amount decimal(12,4)
);

--DROP TABLE IF EXISTS rental_items;
CREATE TABLE rental_items(
	rental_id INTEGER REFERENCES rentals(id) ON DELETE CASCADE,
	movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
	quantity INTEGER DEFAULT 0,
	price_each decimal(12,4),
	
	PRIMARY KEY (rental_id, movie_id)
);

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

INSERT INTO movierental.dev.directors(name, bio) VALUES 
('john', 'nothing'),
('jane', 'nothing'),
('josh', 'nothing')
;

INSERT INTO movierental.dev.movies(title, release_year, rating, stock, director_id, genre)
	VALUES
		('The Little John', 2010, 4.5, 50, 1, 'comedy'),
		('A Strong Women:Jane', 1990, 5.0, 2, 2, 'dramatic'),
		('My Name is Josh', 2002, 3.4, 1000, 3, 'action')
	;
		
INSERT INTO movierental.dev.customers(name, email)
	VALUES	
		('Deny', 'deny@mail.com'),
		('Joy', 'Joy@mail.com'),
		('Soya', 'Soya@mail.com')
	;

INSERT INTO movierental.dev.rentals(customer_id, total_amount)
	VALUES
		(1, 500),
		(2, 100),
		(3, 250)
	;

INSERT INTO movierental.dev.rental_items(rental_id, movie_id, quantity, price_each)
	VALUES
		(1, 2, 50, 375),
		(2, 2, 100, 375),
		(3, 3, 1, 50)
	;

SELECT m.title, d.name FROM movies m
INNER JOIN directors d
ON m.director_id = d.id 
;

SELECT c.name, r.rental_date, r.total_amount FROM customers c
RIGHT JOIN rentals r ON r.customer_id = c.id
WHERE name ILIKE '%SOYA%';
;

SELECT SUM(ri.quantity * rI.price_each) AS revenue FROM rentals r
LEFT JOIN rental_items ri ON ri.rental_id = r.id;

		
SELECT c.name, SUM(r.id) AS rental_number FROM customers c
LEFT JOIN rentals r ON r.customer_id = c.id
GROUP BY c.name
;

SELECT m.title, SUM(ri.quantity) AS total_quantity
FROM movies m
LEFT JOIN rental_items ri ON ri.movie_id = m.id
GROUP BY m.title
HAVING SUM(ri.quantity) IS NOT NULL
ORDER BY total_quantity DESC
LIMIT 1;


SELECT c.name, SUM(r.id) AS rental_number FROM customers c
LEFT JOIN rentals r ON r.customer_id = c.id
GROUP BY c.name
HAVING SUM(r.id) >= 3;
;
		
		
