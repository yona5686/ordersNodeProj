const { getAllBooks, getBook, createBook, getAllBooksByTitle, getAllBooksByGenre, getAllBooksByYear, getAllBooksByCountry } = require('../services/books')

module.exports = {
    listBooks: async (req, res) => {
        try {
            const books = await getAllBooks()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getBook: async (req, res) => {
        try {
            const id = req.params.id
            const book = await getBook(id)
            res.json(book)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createBook: async (req, res) => {
        try {
            const books = req.body;
            
            if (Array.isArray(books)) {
                books.map(async (book) => {
                    const newBook = await createBook({...book});
                    res.json(newBook)
                })
            }
            else{
                const newBook = await createBook({...books});
                res.json(newBook);
            }
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getBookbyVal: async (req, res) => {
        try {
            const { category, pageNumber, val } = req.params

            switch(category){
                case "title":
                    books = await getAllBooksByTitle(pageNumber, val);
                    break;
                case "genre":
                    books = await getAllBooksByGenre(pageNumber, val);
                    break;
                case "year":
                    books = await getAllBooksByYear(pageNumber, val);
                    break;
                case "country":
                    books = await getAllBooksByCountry(pageNumber, val);
                    break;
            }
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
}