const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
