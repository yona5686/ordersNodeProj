const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: String,
    publishingYear: Number,
    genres: [String],
    authors: [Schema.Types.ObjectId],
    quantity: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },
});

const Book = model('Book', bookSchema);
module.exports = Book;
