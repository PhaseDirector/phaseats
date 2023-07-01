const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PhaseATS',
  password: 'password',
  port: 5432, // or your PostgreSQL port
});

// Retrieve all candidates
router.get('/candidates', (req, res) => {
  pool.query('SELECT * FROM candidates', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Query executed successfully:', result.rows);
      res.status(200).json(result.rows);
    }
  });
});

// Retrieve a specific candidate by ID
router.get('/candidates/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM candidates WHERE candidate_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Candidate not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Create a new candidate
router.post('/candidates', (req, res) => {
  const { first_name, last_name, address, phone, email, notes, type, specialization, skills } = req.body;
  pool.query(
    'INSERT INTO candidates (first_name, last_name, address, phone, email, notes, type, specialization, skills) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [first_name, last_name, address, phone, email, notes, type, specialization, skills],
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

// Update an existing candidate
router.put('/candidates/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, address, phone, email, notes, type, specialization, skills } = req.body;
  pool.query(
    'UPDATE candidates SET first_name = $1, last_name = $2, address = $3, phone = $4, email = $5, notes = $6, type = $7, specialization = $8, skills = $9 WHERE candidate_id = $10 RETURNING *',
    [first_name, last_name, address, phone, email, notes, type, specialization, skills, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Candidate not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});


// Delete a candidate
router.delete('/candidates/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM candidates WHERE candidate_id = $1', 
    [id], 
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Candidate not found' });
      } else {
        res.status(204).end();
      }
    }
  );
});


// Retrieve all jobs
router.get('/jobs', (req, res) => {
  pool.query('SELECT * FROM jobs', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Query executed successfully:', result.rows);
      res.status(200).json(result.rows);
    }
  });
});

// Retrieve a specific job by ID
router.get('/jobs/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM jobs WHERE job_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Create a new job
router.post('/jobs', (req, res) => {
  const { job_title, description, location, requirements } = req.body;
  pool.query(
    'INSERT INTO jobs (job_title, description, location, requirements) VALUES ($1, $2, $3, $4) RETURNING *',
    [job_title, description, location, requirements],
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

// Update an existing job
router.put('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const { job_title, description, location, requirements } = req.body;
  pool.query(
    'UPDATE jobs SET job_title = $1, description = $2, location = $3, requirements = $4 WHERE job_id = $5 RETURNING *',
    [job_title, description, location, requirements, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Job not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});
// ...

// Create a new job
router.post('/jobs', (req, res) => {
  const { job_title, description, location, requirements } = req.body;
  pool.query(
    'INSERT INTO jobs (job_title, description, location, requirements) VALUES ($1, $2, $3, $4) RETURNING *',
    [job_title, description, location, requirements],
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

// Delete a job
router.delete('/jobs/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM jobs WHERE job_id = $1',
    [id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Job not found' });
      } else {
        res.status(204).send(); // Successful deletion, no content to send
      }
    }
  );
});


// ...

// Update an existing job
router.put('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const { job_title, description, location, requirements } = req.body;
  pool.query(
    'UPDATE jobs SET job_title = $1, description = $2, location = $3, requirements = $4 WHERE job_id = $5 RETURNING *',
    [job_title, description, location, requirements, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Job not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// ...

// Retrieve all clients
router.get('/clients', (req, res) => {
  pool.query('SELECT * FROM clients', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Query executed successfully:', result.rows);
      res.status(200).json(result.rows);
    }
  });
});

// Retrieve a specific client by ID
router.get('/clients/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM clients WHERE client_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Create a new client
router.post('/clients', (req, res) => {
  const { client_name, address, website, notes } = req.body;
  pool.query(
    'INSERT INTO clients (client_name, address, website, notes) VALUES ($1, $2, $3, $4) RETURNING *',
    [client_name, address, website, notes],
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

// Update an existing client
router.put('/clients/:id', (req, res) => {
  const { id } = req.params;
  const { client_name, address, website, notes } = req.body;
  pool.query(
    'UPDATE clients SET client_name = $1, address = $2, website = $3, notes = $4 WHERE client_id = $5 RETURNING *',
    [client_name, address, website, notes, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Client not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// Delete a client
router.delete('/clients/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM clients WHERE client_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.status(204).end();
    }
  });
});



// Retrieve all groups
router.get('/groups', (req, res) => {
  pool.query('SELECT * FROM groups', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Query executed successfully:', result.rows);
      res.status(200).json(result.rows);
    }
  });
});

// Retrieve a specific group by ID
router.get('/groups/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM groups WHERE group_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Group not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Create a new group
router.post('/groups', (req, res) => {
  const { name, description } = req.body;
  pool.query(
    'INSERT INTO groups (name, description) VALUES ($1, $2) RETURNING *',
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

// Update an existing group
router.put('/groups/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  pool.query(
    'UPDATE groups SET name = $1, description = $2 WHERE group_id = $3 RETURNING *',
    [name, description, id],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Group not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// Delete a group
router.delete('/groups/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM groups WHERE group_id = $1', [id], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Group not found' });
    } else {
      res.status(204).end();
    }
  });
});

// Delete a candidate group
router.delete('/candidategroups/:id', (req, res) => {
  const candidategroupId = req.params.id;

  pool.query(
    'DELETE FROM candidategroups WHERE id = $1',
    [candidategroupId],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(204).end(); // No content response
      }
    }
  );
});

// Update a candidate group
router.put('/candidategroups/:id', (req, res) => {
  const candidategroupId = req.params.id;
  const { candidate_id, group_id } = req.body;

  // Perform validation if necessary
  if (!candidate_id || !group_id) {
    res.status(400).json({ error: 'Candidate ID and Group ID are required' });
    return;
  }

  pool.query(
    'UPDATE candidategroups SET candidate_id = $1, group_id = $2 WHERE id = $3 RETURNING *',
    [candidate_id, group_id, candidategroupId],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// Get a candidate group by ID
router.get('/candidategroups/:id', (req, res) => {
  const candidategroupId = req.params.id;

  pool.query(
    'SELECT * FROM candidategroups WHERE id = $1',
    [candidategroupId],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'Candidate Group not found' });
        } else {
          res.status(200).json(result.rows[0]);
        }
      }
    }
  );
});

// Assign a candidate to a group
router.post('/groups/:groupId/candidates/:candidateId', (req, res) => {
  const { groupId, candidateId } = req.params;
  pool.query(
    'INSERT INTO group_candidates (group_id, candidate_id) VALUES ($1, $2) RETURNING *',
    [groupId, candidateId],
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

// Save candidates to a group
router.post('/candidategroups', (req, res) => {
  const { candidate_id, group_id } = req.body;

  // Perform validation if necessary
  if (!candidate_id || !group_id) {
    res.status(400).json({ error: 'Candidate ID and Group ID are required' });
    return;
  }

  pool.query(
    'INSERT INTO candidategroups (candidate_id, group_id) VALUES ($1, $2) RETURNING *',
    [candidate_id, group_id],
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

// Retrieve all candidate groups
router.get('/candidategroups', (req, res) => {
  pool.query('SELECT * FROM candidategroups', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Query executed successfully:', result.rows);
      res.status(200).json(result.rows);
    }
  });
});

module.exports = router;
