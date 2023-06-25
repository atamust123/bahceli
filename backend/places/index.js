// Server-side code using Express.js and Mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bahceliGuide',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model('places');
module.exports=Places;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is Working');
});

// mekan eklemek için düzelt
//app.post('/register', async (req, res) => {
//  try {
//    const { place, forWhat, semt, visited, point, koltuk} = req.body;
//
//    // Check if the user already exists
//    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//    if (existingUser) {
//      return res.status(409).json({ error: 'User already exists' });
//    }
//
//    const newUser = new User({ username, email, password });
//    const result = await newUser.save();
//
//    if (result) {
//      res.json(result);
//      console.log(result);
//    } else {
//      console.log('Failed to save user');
//    }
//  } catch (e) {
//    console.error(e);
//    res.status(500).json({ error: 'Something went wrong' });
//  }
//});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
