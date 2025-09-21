const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  credits: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 
