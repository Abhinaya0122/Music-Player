const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'musicsdb';
const COLLECTION_NAME = 'musicsdb';

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/musics', express.static(path.join(__dirname, 'musics')));

let db, musicCollection;

MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    db = client.db(DB_NAME);
    musicCollection = db.collection(COLLECTION_NAME);
  })
  .catch(error => console.error(error));

app.get('/api/musics', async (req, res) => {
  try {
    const musics = await musicCollection.find().toArray();
    res.json(musics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
