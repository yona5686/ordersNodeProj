const Book = require("../models/books");

module.exports = {
    
    getAllBooks: async () => {
        const allBooks = await Book.find({});
        return allBooks.map(b => ({
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price,
        }));
    },
    getBook: async (strId) => {
        const book = await Book.findOne({ _id: strId });
        const { title, publishingYear, genres, authors, quantity, price } = book;
        return {
            title,
            publishingYear,
            genres,
            authors,
            quantity,
            price
        };

    },
    createBook: async ({title, publishingYear, genres, authors, quantity, price}) => {
        const newBook = new Book({ title, publishingYear, genres, authors, quantity, price });
        return newBook.save();
    },
    getAllBooksByTitle: async (pageNumber, val) => {
        const allBooks = await Book.find({ title: { $regex: val, $options: "i" }})
        .skip(pageNumber * 10)
        .limit(10);
        
        return allBooks.map(b => ({
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price,
        }));
    },
    getAllBooksByGenre: async (pageNumber, val) => {
        const allBooks = await Book.find({genres: { $in: [val]}})
        .skip(pageNumber * 10)
        .limit(10);
        
        return allBooks.map(b => ({
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price,
        }));
    },
    getAllBooksByYear: async (pageNumber, val) => {
        const allBooks = await Book.find({publishingYear: { $gt: val.split('-')[0], $lt: val.split('-')[1]}})
        .skip(pageNumber * 10)
        .limit(10);
        
        return allBooks.map(b => ({
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price,
        }));
    },
    getAllBooksByCountry: async (pageNumber, val) => {
        const allBooks = await Book.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'authors', 
                    'localField': 'authors', 
                    'foreignField': '_id', 
                    'as': 'authors'
                  }
                }, {
                  '$match': {
                    'authors.country': val
                  }
                }
              ]
        )
        .skip(pageNumber * 10)
        
        return allBooks.map(b => ({
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price,
        }));
    },
}