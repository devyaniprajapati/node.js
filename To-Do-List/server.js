const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;
const dbFilePath = './db.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read 
const readDB = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Write
const writeDB = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// CRUD Routes


app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const todos = readDB();
  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);
  writeDB(todos);
  res.status(201).json(newTodo);
});

// Read: Get 
app.get('/api/todos', (req, res) => {
  const todos = readDB();
  res.json(todos);
});


app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readDB();
  const todo = todos.find(t => t.id === parseInt(id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Update
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todos = readDB();
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));
  if (todoIndex !== -1) {
    todos[todoIndex].task = task;
    writeDB(todos);
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readDB();
  const updatedTodos = todos.filter(t => t.id !== parseInt(id));
  writeDB(updatedTodos);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
