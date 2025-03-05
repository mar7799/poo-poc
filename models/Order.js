const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    products: [{
      productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      },
      totalPrice: { 
        type: Number, 
        required: true 
      }
    }],
    totalAmount: {
      type: Number, // Total price for the order
      required: true
    },
    shippingAddress: addressSchema, // Shipping address for the order
    orderStatus: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    paymentMethod: {
      type: String, // e.g., 'Credit Card', 'PayPal', etc.
    },
    trackingNumber: {
      type: String // A tracking number for shipping
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;
  