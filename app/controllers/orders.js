const { getAllOrders, getOrder, createOrder, getMaxTotalPrice, getMostPopularGenres, getProfitsBetweenDates, getTop5Authors } = require('../services/orders')

module.exports = {
    listOrders: async (req, res) => {
        try {
            const orders = await getAllOrders()
            res.json(orders)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    getOrder: async (req, res) => {
        try {
            const id = req.params.id
            const order = await getOrder(id)
            res.json(order)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    createOrder: async (req, res) => {
        try {
            const { books, amounts } = req.body;
            const newOrder = await createOrder(books, amounts);
            res.json(newOrder);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getByVal: async (req, res) => {
        try {
            const { name } = req.params;
            const { start, end } = req.body;

            switch(name){
                case "maxTotalPrice":
                    result = await getMaxTotalPrice(start, end);
                    break;
                case "mostPopularGenres":
                    result = await getMostPopularGenres(start, end);
                    break;
                case "profitsBetweenDates":
                    result = await getProfitsBetweenDates(start, end);
                    break;
                case "top5Authors":
                    result = await getTop5Authors(start, end);
                    break;
            }
            res.json(result)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
}