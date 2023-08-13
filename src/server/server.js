const express = require('express');
const app = express();
const cors = require('cors');
const apiRoutes = require('../routes/apiRoutes');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

app.use(express.json());
app.use(cors());

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(__dirname, '..', 'components', 'uploads');
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create a multer upload instance with the configured storage
const upload = multer({ storage: storage });

// File upload route
app.post('/api/uploads', upload.single('file'), (req, res) => {
  // The uploaded file can be accessed using req.file
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
  } else {
    const filename = req.file.filename;
    // Process the uploaded file as needed
    // For example, save the file path to the database or perform further operations
    res.status(200).json({ filename: filename });
  }
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'components', 'uploads')));

// Mount the API routes
app.use('/api', apiRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
