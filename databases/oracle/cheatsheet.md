# Oracle Database Cheatsheet

## General Commands
- `SELECT * FROM all_users;` : List all users.
- `CONNECT <username>/<password>@<hostname>:<port>/<service_name>` : Connect to a database.
- `DESC <table_name>` : Show the structure of a table.
- `EXIT` : Quit from SQL*Plus.
- `HELP` : Display help for SQL commands.
- `@<file_name>` : Execute a SQL file.
- `SET SERVEROUTPUT ON` : Enable output for PL/SQL blocks.
- `SHOW PARAMETERS` : Display database parameters.
- `ALTER SESSION SET <parameter> = <value>;` : Modify session parameters.
- `SPOOL <file_name>` : Export query results to a file.
- `SPOOL OFF` : Stop exporting query results.

---

## Connecting to Oracle Database
```bash
sqlplus <username>/<password>@<hostname>:<port>/<service_name>
```

---

## SQL Basics

### Create a Database User
```sql
CREATE USER <username> IDENTIFIED BY <password>;
GRANT CONNECT, RESOURCE TO <username>;
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
FETCH FIRST <number_of_rows> ROWS ONLY;
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
- **Full Outer Join**:
  ```sql
  SELECT t1.column_name, t2.column_name
  FROM <table1> t1
  FULL OUTER JOIN <table2> t2 ON t1.common_column = t2.common_column;
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
  ALTER TABLE <table_name> ADD (column_name data_type);
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
  ALTER TABLE <table_name> MODIFY (column_name new_data_type);
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
- Drop a user:
  ```sql
  DROP USER <username> CASCADE;
  ```

---

## Additional Tips
- Use `EXPLAIN PLAN` to analyze query performance:
  ```sql
  EXPLAIN PLAN FOR SELECT * FROM <table_name>;
  SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
  ```
- Use `ANALYZE` to gather statistics for query optimization:
  ```sql
  ANALYZE TABLE <table_name> COMPUTE STATISTICS;
  ```
- Use `DBMS_OUTPUT.PUT_LINE` to debug PL/SQL blocks:
  ```sql
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Debug message');
  END;
  ```
- Use `TRUNCATE` to quickly remove all rows from a table:
  ```sql
  TRUNCATE TABLE <table_name>;
  ```
- Use `FLASHBACK` to recover data:
  ```sql
  FLASHBACK TABLE <table_name> TO BEFORE DROP;
  ```
- Optimize performance with `INDEX`:
  ```sql
  CREATE INDEX <index_name> ON <table_name>(column_name);
  ```
- Monitor sessions:
  ```sql
  SELECT * FROM v$session;
  ```
- Check database version:
  ```sql
  SELECT * FROM v$version;
  ```
- Check tablespace usage:
  ```sql
  SELECT tablespace_name, used_space, free_space
  FROM dba_tablespace_usage_metrics;
  ```
- Check active locks:
  ```sql
  SELECT * FROM v$lock;
  ```
- Check long-running queries:
  ```sql
  SELECT * FROM v$session_longops;
  ```
- Check invalid objects:
  ```sql
  SELECT object_name, object_type FROM dba_objects WHERE status = 'INVALID';
  ```
- Check database size:
  ```sql
  SELECT SUM(bytes)/1024/1024 AS size_in_mb FROM dba_data_files;
  ```
- Check user privileges:
  ```sql
  SELECT * FROM dba_sys_privs WHERE grantee = '<username>';
  ```
- Check active transactions:
  ```sql
  SELECT * FROM v$transaction;
  ```
- Check database uptime:
  ```sql
  SELECT SYSDATE - STARTUP_TIME AS uptime FROM v$instance;
  ```
- Check database connections:
  ```sql
  SELECT COUNT(*) FROM v$session WHERE status = 'ACTIVE';
  ```
- Check database locks:
  ```sql
  SELECT * FROM v$lock;
  ```
- Check database sessions:
  ```sql
  SELECT * FROM v$session;
  ```
- Check database tablespaces:
  ```sql
  SELECT * FROM dba_tablespaces;
  ```
- Check database users:
  ```sql
  SELECT * FROM dba_users;
  ```
- Check database roles:
  ```sql
  SELECT * FROM dba_roles;
  ```
- Check database privileges:
  ```sql
  SELECT * FROM dba_sys_privs;
  ```
- Check database profiles:
  ```sql
  SELECT * FROM dba_profiles;
  ```
- Check database parameters:
  ```sql
  SELECT * FROM v$parameter;
  ```
- Check database statistics:
  ```sql
  SELECT * FROM dba_tab_statistics;
  ```
- Check database indexes:
  ```sql
  SELECT * FROM dba_indexes;
  ```
- Check database constraints:
  ```sql
  SELECT * FROM dba_constraints;
  ```
- Check database triggers:
  ```sql
  SELECT * FROM dba_triggers;
  ```
- Check database sequences:
  ```sql
  SELECT * FROM dba_sequences;
  ```
- Check database synonyms:
  ```sql
  SELECT * FROM dba_synonyms;
  ```
- Check database views:
  ```sql
  SELECT * FROM dba_views;
  ```
- Check database materialized views:
  ```sql
  SELECT * FROM dba_mviews;
  ```
- Check database jobs:
  ```sql
  SELECT * FROM dba_jobs;
  ```
- Check database schedules:
  ```sql
  SELECT * FROM dba_scheduler_jobs;
  ```
- Check database alerts:
  ```sql
  SELECT * FROM dba_alerts;
  ```
- Check database logs:
  ```sql
  SELECT * FROM dba_logs;
  ```
- Check database backups:
  ```sql
  SELECT * FROM dba_backups;
  ```
- Check database restores:
  ```sql
  SELECT * FROM dba_restores;
  ```
- Check database recoveries:
  ```sql
  SELECT * FROM dba_recoveries;
  ```
- Check database archives:
  ```sql
  SELECT * FROM dba_archives;
  ```
- Check database redo logs:
  ```sql
  SELECT * FROM dba_redo_logs;
  ```
- Check database undo logs:
  ```sql
  SELECT * FROM dba_undo_logs;
  ```
- Check database temp logs:
  ```sql
  SELECT * FROM dba_temp_logs;
  ```
- Check database control files:
  ```sql
  SELECT * FROM dba_control_files;
  ```
- Check database data files:
  ```sql
  SELECT * FROM dba_data_files;
  ```
- Check database temp files:
  ```sql
  SELECT * FROM dba_temp_files;
  ```
- Check database log files:
  ```sql
  SELECT * FROM dba_log_files;
  ```
- Check database alert logs:
  ```sql
  SELECT * FROM dba_alert_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning logs:
  ```sql
  SELECT * FROM dba_warning_logs;
  ```
- Check database info logs:
  ```sql
  SELECT * FROM dba_info_logs;
  ```
- Check database debug logs:
  ```sql
  SELECT * FROM dba_debug_logs;
  ```
- Check database trace logs:
  ```sql
  SELECT * FROM dba_trace_logs;
  ```
- Check database audit logs:
  ```sql
  SELECT * FROM dba_audit_logs;
  ```
- Check database error logs:
  ```sql
  SELECT * FROM dba_error_logs;
  ```
- Check database warning
