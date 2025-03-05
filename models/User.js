const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Address Schema (embedded within User)
const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String
});

// Define the User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  address: addressSchema, // Embedded address object
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }] // References to Order schema
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
