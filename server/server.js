
const express = require('express');
const cors =require("cors");
const bodyParser = require('body-parser');
const mongoConnect = require('./db/mongoConnect.js');
const ObjectId = require('mongodb').ObjectId;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(mongoConnect);

const port = process.env.PORT || 5000;

const collectionName = 'records';

// Get All Users
app.get('/', async (req, res) => {
    try {
      const users = await req.db.collection(collectionName).find().toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  })

// Get user by ID
app.get('/:id', async (req, res) => {
  console.log("req.params.id::",req.params.id)
  try {
    const id = new ObjectId(req.params.id);
    const user = await req.db.collection(collectionName).findOne({ _id:id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create a user
app.post('/', async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
          };
      const newUser = await req.db.collection(collectionName).insertOne(newDocument);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });

// update a user
app.put('/:id', async (req, res) => {
  console.log("req.params.id::", req.params.id);

  try {
    const id = new ObjectId(req.params.id);
    const updates = {
        $set: {
          name: req.body.name,
          position: req.body.position,
          level: req.body.level,
        },
      };

    const result = await req.db.collection(collectionName).updateOne(
      { _id: id },
      updates,
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete User
app.delete('/:id', async (req, res) => {
  console.log("req.params.id::", req.params.id);

  try {
    const id = new ObjectId(req.params.id);

    const result = await req.db.collection(collectionName).deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted', id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
