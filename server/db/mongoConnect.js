const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

 const uri = 'mongodb://localhost:27017'; // replace with your MongoDB container IP and database
  
  let db;
  let client = new MongoClient(uri);
  
  async function mongoConnect(req, res, next) {
    if (!db) {
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        req.db = client.db(dbName);
        next();
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ error: 'An error occurred while connecting to MongoDB' });
      }
    } else {
      next();
    }
  }

  
  module.exports = mongoConnect;
