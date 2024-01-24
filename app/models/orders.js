const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
    bookId: ObjectId,
    amount: Number
});


const orderSchema = new Schema({
    items: [orderItemSchema],
    totalPrice: Number,
    date: { type: Date, default: Date.now() }
});

const Order = model('Order', orderSchema);
const OrderItem = model('OrderItem', orderItemSchema);
module.exports = Order, OrderItem;
