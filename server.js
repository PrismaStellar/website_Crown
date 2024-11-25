const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'reddonno' 
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

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
