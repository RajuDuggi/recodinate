
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  EmployeId: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Salary: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'complete', 'reject'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Todo', todoSchema);
