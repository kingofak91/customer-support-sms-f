const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries: [
    {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      reason: { type: String, required: true }, // Added reason field
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
