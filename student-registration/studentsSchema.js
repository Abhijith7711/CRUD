const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  mobile: String,
  gender: String
});

module.exports = mongoose.model('Student', studentSchema);
