const Product = require('../models/product');
const products = require('../data/products.json');
const connectDatabase = require('../config/database');

connectDatabase();
const seedProducst = async () => {
  // delete all the products from the database
  await Product.deleteMany({});
  console.log('================================deleted all the products');
  await Product.insertMany(products);
  console.log(
    '================================inserted all the products successfully'
  );
};

seedProducst();
