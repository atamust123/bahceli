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

// Schema for users of app
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('users', userSchema);
module.exports=User;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is Working');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    const result = await newUser.save();

    if (result) {
      res.json(result);
      console.log(result);
    } else {
      console.log('Failed to save user');
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

app.post('/login', async (req, res) => {
  try {
    const { unameOrEmail, pass } = req.body;

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: unameOrEmail }, { email: unameOrEmail }]
    });

    if (user) {
      // Compare the password manually
      if (user.password !== pass) {
        return res.status(401).json({ error: 'Wrong password' });
      }

      // Passwords match, authentication successful
      return res.json({ message: 'Authentication successful' });
    }

    // User not found
    res.status(404).json({ error: 'User not found' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Client-side code using fetch
const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = formData.get('uname');
  const email = formData.get('uemail');
  const password = formData.get('pass');

  try {
    const result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.ok) {
      const response = await result.json();
      console.warn(response);
      alert('Data saved successfully');
      setUsername('');
      setPassword('');
      setEmail('');
    } else {
      console.error('Request failed with status:', result.status);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};
