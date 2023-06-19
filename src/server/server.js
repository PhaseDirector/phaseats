const express = require('express');
const app = express();
const cors = require('cors');
const apiRoutes = require('../routes/apiRoutes');








app.use(express.json());
app.use(cors());

// Define route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the PhaseATS API!');
});

// Mount the API routes
app.use('/api', apiRoutes);

// ...

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ...



// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





