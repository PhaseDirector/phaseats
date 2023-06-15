const express = require('express');
const app = express();
const port = 8000;
const apiRoutes = require('../routes/apiRoutes');

app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the 'app' variable
