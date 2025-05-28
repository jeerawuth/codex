import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './todo.db',
    driver: sqlite3.Database
  });
  await db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    date DATETIME,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
})();

app.get('/todos', async (_req, res) => {
  const todos = await db.all('SELECT * FROM todos ORDER BY created_at DESC');
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { text, date } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });
  const result = await db.run(
    'INSERT INTO todos (text, date) VALUES (?, ?)',
    text,
    date || null
  );
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', result.lastID);
  res.status(201).json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, date } = req.body;
  await db.run(
    'UPDATE todos SET text = ?, date = ? WHERE id = ?',
    text,
    date || null,
    id
  );
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', id);
  res.json(todo);
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await db.run('UPDATE todos SET completed = ? WHERE id = ?', completed ? 1 : 0, id);
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', id);
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM todos WHERE id = ?', id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
