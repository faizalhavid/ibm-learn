ALTER TABLE order_items
DROP CONSTRAINT IF EXISTS order_items_book_id_fkey;

ALTER TABLE order_items
ADD CONSTRAINT order_items_book_id_fkey
FOREIGN KEY (book_id)
REFERENCES books(id)
ON DELETE CASCADE;


SELECT * from authors;
DELETE from authors
WHERE name = 'Tere Liye';


SELECT * from order_items;