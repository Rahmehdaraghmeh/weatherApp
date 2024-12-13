// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // Enable CORS
app.use(express.static('website')); // Serve static files

// Initialize projectData
let projectData = {};

// GET route to retrieve project data
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
  
  console.log(req.body);
  
  const { temp, date, feel,country} = req.body;
  console.log('Received data on server:', req.body); // طباعة البيانات المستلمة على الخادم

  projectData ={ temp, date, feel,country };
  res.send({ message: 'Data successfully saved!' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
