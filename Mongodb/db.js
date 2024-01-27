const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://marbm23:Brandon18@colorcodedlabs.bwux2jy.mongodb.net/';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = db;


