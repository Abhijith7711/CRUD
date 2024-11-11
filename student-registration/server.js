const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // To handle file paths

const Student = require('./studentsSchema.js'); // Ensure this file exists and is correct

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Static folder setup

// Serve the index.html file when the root ("/") path is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Adjust this path if your index.html is elsewhere
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// POST endpoint to store student data
app.post('/submit', (req, res) => {
  const { name, email, course, mobile, gender } = req.body;

  const newStudent = new Student({ name, email, course, mobile, gender });

  newStudent.save()
    .then(() => res.send('Student registered successfully'))
    .catch(err => {
      console.log('Error saving student:', err);
      res.status(400).send('Error: ' + err);
    });
});

// GET endpoint to retrieve all students
app.get('/students', (req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
