const { getAllAuthors, getAuthor, createAuthor, updateAuthor, getAllBooks } = require('../services/authors')

module.exports = {
    listAuthors: async (req, res) => {
        try {
            const authors = await getAllAuthors()
            res.json(authors)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAuthor: async (req, res) => {
        try {
            const id = req.params.id
            const author = await getAuthor(id)
            res.json(author)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createAuthor: async (req, res) => {
        try {
            const { name, country } = req.body
            const newAuthor = await createAuthor(name, country)
            res.json(newAuthor)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const { id, name, country } = req.body
            const updatedAuthor = await updateAuthor(id, name, country)
            res.json(updatedAuthor)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const { pageNumber, id } = req.params
            const allBooks = await getAllBooks(pageNumber, id)
            res.json(allBooks)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}