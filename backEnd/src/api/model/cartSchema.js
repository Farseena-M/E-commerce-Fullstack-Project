const mongoose = require('mongoose')
const products = require('./productSchema')

const cartSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:products
        }
    ],
    TotalPrice:{
        type:Number,
        default:0
    }
})

const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart