const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'reddonno' 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(session({
  secret: 'secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/api/donations', (req, res) => {
  const sql = 'SELECT * FROM donations';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

app.get('/account-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/donasi', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'donasi.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
