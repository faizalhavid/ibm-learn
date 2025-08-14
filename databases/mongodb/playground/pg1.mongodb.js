use('e-store');

db.createCollection('customers');
db.createCollection('products');
db.createCollection('orders');

db.getCollectionNames();

db.customers.insertOne({
  _id: 'Charte',
  name: 'Cartehiya',
});

db.products.insertMany([
  {
    _id: 1,
    name: 'Mie Sedap Goreng Rasa Ayam',
    price: new NumberLong('6000'),
    purchaseAt: new Date('22-02-2024'),
  },
  {
    _id: 2,
    name: 'Mie Sedap Kuah Rasa  Bawang',
    price: new NumberLong('2000'),
    purchaseAt: new Date('22-02-2024'),
  },
  {
    _id: 3,
    name: 'Mie Sedap Goreng Rasa Ayam Pop',
    price: new NumberLong('4000'),
    purchaseAt: new Date('22-02-2024'),
  },
]);

orderedProducts = db.products.find({}).toArray();

db.orders.insertMany([
  {
    _id: ObjectId(),
    orderAt: new Date(),
    items: orderedProducts,
    user: db.users.findOne({ id: 'Charte' }),
  },
]);

db.orders.find({
  'items._id': 1,
});

db.orders.insertOne({
  _id: ObjectId(),
  orderAt: new Date(),
  items: [
    {
      product_id: ObjectId(),
      name: 'Indomie Rasa ayam',
      price: NumberLong('4000'),
      quantity: 2,
    },
    {
      product_id: ObjectId(),
      name: 'Indomie Rasa ayam kari',
      price: NumberLong('4500'),
      quantity: 2,
    },
  ],
});

db.orders.find({
  'items.price': { $lte: 400 },
});
