# PostgreSQL Cheatsheet

## General Commands
- `\l` : List all databases.
- `\c <database_name>` : Connect to a database.
- `\dt` : List all tables in the current database.
- `\d <table_name>` : Show the structure of a table.
- `\d+ <table_name>` : Show the structure of a table with more details.
- `\q` : Quit from `psql`.
- `\h` : Display help for SQL commands.
- `\?` : Display help for `psql` commands.
- `\g` : Execute the last command.
- `\i <file_name>` : Execute a SQL file.
- `\copy <table_name> FROM '<file_name>'` : Import data from a file.
- `\copy <table_name> TO '<file_name>'` : Export data to a file.
- `\set` : Set a variable.
- `\unset` : Unset a variable.
- `\echo` : Print a message.
- `\timing` : Show the execution time of queries.

---

## Connecting to PostgreSQL
```bash
psql -h localhost -U postgres -d <database_name> -p 5432
```

---

## SQL Basics

### Create a Database
```sql
CREATE DATABASE <database_name>;
```

### Create a Table
```sql
CREATE TABLE <table_name> (
    column_name1 data_type [constraints],
    column_name2 data_type [constraints],
    ...
);
```

### Insert Data
```sql
INSERT INTO <table_name> (column_name1, column_name2, ...)
VALUES (value1, value2, ...);
```

### Query Data
```sql
SELECT column_name1, column_name2, ...
FROM <table_name>
WHERE condition
ORDER BY column_name1 [ASC|DESC]
LIMIT <number_of_rows> OFFSET <number_of_rows>;
```

#### Common Query Examples
- Select all columns:
  ```sql
  SELECT * FROM <table_name>;
  ```
- Select distinct values:
  ```sql
  SELECT DISTINCT column_name FROM <table_name>;
  ```
- Aggregate functions:
  ```sql
  SELECT COUNT(column_name), SUM(column_name), AVG(column_name), MIN(column_name), MAX(column_name)
  FROM <table_name>;
  ```
- Group by:
  ```sql
  SELECT column_name1, COUNT(column_name2)
  FROM <table_name>
  GROUP BY column_name1
  HAVING COUNT(column_name2) > <number>;
  ```

---

## Joins
- **Inner Join**:
  ```sql
  SELECT t1.column_name, t2.column_name
  FROM <table1> t1
  INNER JOIN <table2> t2 ON t1.common_column = t2.common_column;
  ```
- **Left Join**:
  ```sql
  SELECT t1.column_name, t2.column_name
  FROM <table1> t1
  LEFT JOIN <table2> t2 ON t1.common_column = t2.common_column;
  ```
- **Right Join**:
  ```sql
  SELECT t1.column_name, t2.column_name
  FROM <table1> t1
  RIGHT JOIN <table2> t2 ON t1.common_column = t2.common_column;
  ```
- **Full Join**:
  ```sql
  SELECT t1.column_name, t2.column_name
  FROM <table1> t1
  FULL JOIN <table2> t2 ON t1.common_column = t2.common_column;
  ```

---

## Subqueries
- Subquery in `WHERE` clause:
  ```sql
  SELECT column_name
  FROM <table_name>
  WHERE column_name IN (SELECT column_name FROM <other_table> WHERE condition);
  ```
- Nested query in `SELECT` clause:
  ```sql
  SELECT column_name, (SELECT column_name FROM <other_table> WHERE condition) AS alias_name
  FROM <table_name>;
  ```

---

## Modifying Data
- **Update Data**:
  ```sql
  UPDATE <table_name>
  SET column_name1 = value1, column_name2 = value2
  WHERE condition;
  ```
- **Delete Data**:
  ```sql
  DELETE FROM <table_name>
  WHERE condition;
  ```

---

## Altering Tables
- Add a column:
  ```sql
  ALTER TABLE <table_name> ADD COLUMN column_name data_type;
  ```
- Drop a column:
  ```sql
  ALTER TABLE <table_name> DROP COLUMN column_name;
  ```
- Rename a column:
  ```sql
  ALTER TABLE <table_name> RENAME COLUMN old_name TO new_name;
  ```
- Change column data type:
  ```sql
  ALTER TABLE <table_name> ALTER COLUMN column_name TYPE new_data_type;
  ```

---

## Advanced SQL Features

### Common Table Expressions (CTEs)
```sql
WITH cte_name AS (
    SELECT column_name1, column_name2
    FROM <table_name>
    WHERE condition
)
SELECT column_name1, column_name2
FROM cte_name;
```

### Window Functions
```sql
SELECT column_name,
       ROW_NUMBER() OVER (PARTITION BY column_name ORDER BY column_name) AS row_num
FROM <table_name>;
```

### Transactions
- Begin a transaction:
  ```sql
  BEGIN;
  ```
- Commit a transaction:
  ```sql
  COMMIT;
  ```
- Rollback a transaction:
  ```sql
  ROLLBACK;
  ```

---

## Dropping Objects
- Drop a table:
  ```sql
  DROP TABLE <table_name>;
  ```
- Drop a database:
  ```sql
  DROP DATABASE <database_name>;
  ```

---

## Additional Tips
- Use `EXPLAIN` to analyze query performance:
  ```sql
  EXPLAIN SELECT * FROM <table_name>;
  ```
- Use `VACUUM` to optimize database performance:
  ```sql
  VACUUM;
  ```
- Use `ANALYZE` to update statistics for query planning:
  ```sql
  ANALYZE;
  ```

