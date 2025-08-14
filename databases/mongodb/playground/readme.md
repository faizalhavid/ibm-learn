# MongoDB Core Concepts

## MongoDB Components

- **MongoDB Daemon (`mongod`)**: The core database server process.
- **MongoDB Compass**: The official GUI for MongoDB.
- **Mongosh**: The MongoDB shell for interacting with your databases.

## Mongosh Commands

### Database Commands

- `use <database>`: Switch to or create a database.
- `db.dropDatabase()`: Drop the current database.
- `db.getName()`: Get the current database name.
- `db.hostInfo()`: Get information about the database host.
- `db.version()`: Get the MongoDB server version.
- `db.stats()`: Get statistics about the current database.

### Collection Commands

- `db.getCollectionNames()`: List all collections in the database.
- `db.createCollection(<name>)`: Create a new collection.
- `db.getCollection(<name>)` or `db.<name>`: Get a collection object.
- `db.getCollectionInfos()`: Get information about all collections.
- `db.<collection>.find()`: Retrieve all documents in a collection.
- `db.<collection>.count()`: Count documents in a collection.
- `db.<collection>.drop()`: Drop a collection.
- `db.<collection>.totalSize()`: Get the total size of a collection.
- `db.<collection>.stats()`: Get statistics about a collection.

## Data Modeling in MongoDB

MongoDB uses a flexible schema model. Unlike traditional relational databases, collections do not enforce a strict schema, allowing documents within the same collection to have different structures. However, it's recommended to keep a consistent schema for maintainability.

### Document Relationships

Every MongoDB document must have a unique `_id` field. MongoDB does not support composite primary keys or foreign keys, but you can model relationships between documents in two main ways:

#### 1. Embedded Documents

Store related data within the same document.

```json
{
  "_id": "1213131413",
  "name": "Carthe",
  "address": {
    "street": "Street 1",
    "city": "California",
    "country": "USA"
  },
  "contact": {
    "email": "carthe@mail.com",
    "phone": "1204328409"
  },
  "hobbies": ["paint", "read"]
}
```

#### 2. Referenced Documents

Store related data in separate documents and reference them by ID.

**User Collection:**

```json
{
  "_id": "12121212",
  "name": "Carthe"
}
```

**Address Collection:**

```json
{
  "_id": "a1",
  "userId": "12121212",
  "street": "Street 1",
  "city": "California",
  "country": "USA"
}
```

**Contact Collection:**

```json
{
  "_id": "c1",
  "userId": "12121212",
  "email": "carthe@mail.com",
  "phone": "1204328409"
}
```

### Embedded vs. Referenced Documents

#### Use Embedded Documents When:

- Data is tightly coupled and always accessed together.
- Embedded data does not need to be updated independently.
- The embedded document is always required when retrieving the parent document.

#### Use Referenced Documents When:

- Data is loosely coupled and can exist independently.
- Documents may grow large or be shared across multiple parent documents.
- You need to update referenced data independently.

- Can manipulate data to reference documents.
- Referenced documents are not always needed when retrieving the parent document.

## BSON (Binary JSON)

BSON is a binary representation of JSON-like documents. It extends JSON's capabilities by including additional data types, such as `Date`, `Binary`, and `ObjectId`, which are not natively supported in JSON. BSON is designed to be efficient for storage and traversal, making it the ideal format for MongoDB's internal data representation.

### Common BSON Data Types and Their MongoDB Aliases

| Type                 | MongoDB Alias | Description                            | Example Value             |
| -------------------- | ------------- | -------------------------------------- | ------------------------- |
| `Double`             | `double`      | 64-bit floating point                  | `3.14159`                 |
| `String`             | `string`      | UTF-8 encoded string                   | `"hello"`                 |
| `Object`             | `object`      | Embedded document                      | `{ "a": 1 }`              |
| `Array`              | `array`       | Array of values                        | `[1, 2, 3]`               |
| `Binary`             | `binData`     | Binary data                            | `bson.Binary(...)`        |
| `ObjectId`           | `objectId`    | Unique identifier for documents        | `ObjectId("...")`         |
| `Boolean`            | `bool`        | Boolean value                          | `true`, `false`           |
| `Date`               | `date`        | Date and time                          | `ISODate("2024-01-01")`   |
| `Null`               | `null`        | Null value                             | `null`                    |
| `Int32`              | `int`         | 32-bit integer                         | `42`                      |
| `Int64`              | `long`        | 64-bit integer                         | `NumberLong("123456789")` |
| `Decimal128`         | `decimal`     | 128-bit decimal floating point         | `NumberDecimal("9.99")`   |
| `Timestamp`          | `timestamp`   | Special internal timestamp             | `Timestamp(1, 1)`         |
| `Regular Expression` | `regex`       | Regular expression                     | `/pattern/i`              |
| `MinKey`             | `minKey`      | Compares lower than all other values   | `MinKey()`                |
| `MaxKey`             | `maxKey`      | Compares higher than all other values  | `MaxKey()`                |
| `Undefined`          | `undefined`   | Deprecated, represents undefined value | `undefined`               |

### ObjectId

objectId is a randomly generated 12-byte identifier typically represented as a 24-character hexadecimal string which contains information about the document's creation time (4 bytes), machine identifier (3 bytes), process identifier (2 bytes), and a counter (3 bytes).
ObjectId is used as the default unique identifier for documents in MongoDB.

### Date and ISODate

BSON Date is a 64-bit integer representing the number of milliseconds since the Unix epoch (January 1, 1970). It is used to store date and time information in MongoDB. The ISODate function is a convenient way to create BSON Date objects in MongoDB queries.

## Inserting Documents

To add a single document to a collection:

```javascript
db.<collection>.insertOne({
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  createdAt: ISODate("2024-01-01T00:00:00Z")
});
```

## Querying Documents

Find all documents in a collection where the `age` field is greater than 25:

```javascript
db.<collection>.find({ age: { $gt: 25 } });
```

### Comparison Operators

You can use comparison operators to filter documents based on field values:

```javascript
db.<collection>.find({
  "<field>": {
    <operator>: <value>
  }
});
```

Common comparison operators:

- `$eq`: Equal to
- `$ne`: Not equal to
- `$gt`: Greater than
- `$gte`: Greater than or equal to
- `$lt`: Less than
- `$lte`: Less than or equal to
- `$in`: In an array of values
- `$nin`: Not in an array of values

### Logical Operators

You can use logical operators to combine multiple conditions in a query:

```javascript
db.<collection>.find({
  $or: [
    { "<field1>": { <operator>: <value1> } },
    { "<field2>": { <operator>: <value2> } }
  ]
});
```

Common logical operators:

- `$and`: Logical AND
- `$or`: Logical OR
- `$not`: Logical NOT
- `$nor`: Logical NOR
