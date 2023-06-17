const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // or your PostgreSQL port
});

// Retrieve all records
router.get('/records', (req, res) => {
  pool.query('SELECT * FROM records', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Retrieve a specific record by ID
router.get('/records/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM records WHERE id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Create a new record
router.post('/records', (req, res) => {
  const { name, description } = req.body;
  pool.query(
    'INSERT INTO records (name, description) VALUES ($1, $2) RETURNING *',
    [name, description],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

// Update an existing record
router.put('/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  pool.query(
    'UPDATE records SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// Delete a record
router.delete('/records/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM records WHERE id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(204).end();
    }
  });
});

module.exports = router;