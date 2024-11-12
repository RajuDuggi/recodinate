const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

  name:{
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
    phonenumber: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  confirmPassword: {
    type: String,
    required: true,
 
  }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  

module.exports = mongoose.model('User', userSchema);
