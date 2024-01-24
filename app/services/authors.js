const Author = require("../models/authors");
const Books = require("../models/books")

module.exports = {
    
    getAllAuthors: async () => {
        const allAuthors = await Author.find({});
        return allAuthors.map(p => ({
            id: p._id,
            name: p.name,
            country: p.country
        }));
    },
    getAuthor: async (strId) => {
        const author = await Author.findOne({ _id: strId });
        const { name, country } = author;
        return {
            name,
            country
        };

    },
    createAuthor: async (name, country) => {
        const newAuthor = new Author({ name, country });
        return newAuthor.save();
    },
    updateAuthor: async (strID, _name, _country) => {
        const author = await Author.updateOne({ _id : strID }, { name: _name, country: _country });
        return author;
    },
    getAllBooks: async (pageNumber, strID) => {
        const allBooks = await Books.find({authors: strID})
        .skip(pageNumber * 10)
        .limit(10);
        
        return allBooks.map(b => ({
            id: b._id,
            title: b.title,
            publishingYear: b.publishingYear,
            genres: b.genres,
            authors: b.authors,
            quantity: b.quantity,
            price: b.price
        }));
    }
}