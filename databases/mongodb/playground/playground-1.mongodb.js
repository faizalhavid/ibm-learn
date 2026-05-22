/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('e-commerce');
db.dropDatabase();

/* 

MongoDB punya 3 mode:
    "strict" → wajib sesuai validator, insert/update yang salah ditolak.

    "moderate" → cuma validasi field yang ada di dokumen, field lain bisa diabaikan.

    "off" → validator diabaikan. (default )

*/

const baseSchema = (requiredProp, properties) => {
  return {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', ...requiredProp],
        properties: {
          _id: {
            bsonType: 'objectId',
            description: "'_id' must be an ObjectId and is required",
          },
          ...properties,
        },
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  };
};

db.createCollection(
  'users',
  baseSchema(['name', 'email', 'role'], {
    name: {
      bsonType: 'string',
      description: "'name' must be a string and required",
    },
    email: {
      bsonType: 'string',
      pattern: "^[a-z0-9'_&+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
      description: "'email' must be a string and the format be valid",
    },
    role: {
      bsonType: 'string',
      enum: ['admin', 'customer', 'seller'],
      description: "the 'role' value only admin, customer, seller",
    },
  })
);

// alter schema
// db.runCommand({ collMod: 'users', ...baseSchema([], { address: { bsonType: 'string' } }) });
db.runCommand({ collMod: 'users', ...baseSchema([], { age: { bsonType: 'int' } }) });

// make field unique : email
db.users.createIndex({ email: 1 }, { unique: true });

db.users.insertOne({
  name: 'John Doe',
  email: 'jhn@eco.com',
  role: 'admin',
});

db.users.insertMany([
  {
    name: 'Jane Carthe',
    email: 'jane@eco.com',
    role: 'seller',
  },
  {
    name: 'Dom Dywane',
    email: 'dom@mail.com',
    role: 'customer',
  },
]);

db.users.insertOne({
  name: 'jOSH',
});

db.users.find({});

//update
db.users.updateOne({ email: 'jane@eco.com' }, { $set: { address: 'Surabaya' } });
// delete
db.users.deleteOne({ name: 'Jane Carthe' });

// query : like
db.users.find({ name: /john/i });

db.users.insertMany([
  { name: 'Tere', role: 'customer', email: 'tere@mail.com' },
  { name: 'Leon', role: 'customer', email: 'leon@mail.com' },
  {
    name: 'Khan',
    role: 'customer',
    email: 'khan@mail.com',
  },
]);

/* 

db.collection.updateMany(
  <filter>,
  <update>,
  <options>
)

*/

db.users.updateMany({ age: { $exists: false } }, { $set: { age: 10 } });
