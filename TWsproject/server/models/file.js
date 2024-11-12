const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

module.exports = mongoose.model('ExcelData', excelDataSchema);




// const mongoose = require('mongoose');

// const excelDataSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   email: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('ExcelData', excelDataSchema);








