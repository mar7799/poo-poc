const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Order', 
      required: true 
    },
    paymentMethod: {
      type: String, // e.g., 'Credit Card', 'Bank Transfer', etc.
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    amount: {
      type: Number,
      required: true
    },
    transactionId: {
      type: String,
      unique: true // Unique transaction ID from the payment provider
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  module.exports = Payment;
  