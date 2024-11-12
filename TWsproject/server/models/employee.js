const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  age:{
    type: Number,
    required:true,
  },
  country: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
