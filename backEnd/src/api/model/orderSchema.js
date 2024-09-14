const mongoose = require('mongoose');
const user = require('./userSchema'); 
const products = require('./productSchema'); 

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user' 
  },
  prdcts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products' 
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
