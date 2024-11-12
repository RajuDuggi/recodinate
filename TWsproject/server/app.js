const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const todoRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/todos', todoRoutes);



let todos = [];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo
app.delete('/api/todos/:index', (req, res) => {
  const { index } = req.params;
  todos = todos.filter((_, i) => i !== parseInt(index));
  res.status(204).send();
});

// Update a todo
app.put('/api/todos/:index', (req, res) => {
  const { index } = req.params;
  const updatedTodo = req.body;
  todos = todos.map((todo, i) => (i === parseInt(index) ? updatedTodo : todo));
  res.json(updatedTodo);
});



// // Use routes
 app.use('/api/auth', authRoutes);

// File upload routes
app.use('/api', fileRoutes);


app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
