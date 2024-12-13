const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Built-in middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Built-in middleware to parse URL-encoded request bodies
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
  const { temp, date, feel, country } = req.body;
  projectData = { temp, date, feel, country }; // Store the incoming data
  res.send({ message: 'Data successfully saved!' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
