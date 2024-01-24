const Order = require("../models/orders");
const Book = require("../models/books");


module.exports = {
    
    getAllOrders: async () => {
        const allOrders = await Order.find({});
        return allOrders.map(b => ({
            items: b.items,
            totalPrice: b.totalPrice,
            date: b.date
        }));
    },
    getOrder: async (strId) => {
        const order = await Order.findOne({ _id: strId });
        const { items, totalPrice } = order;
        return {
            items,
            totalPrice,
        };

    },
    createOrder: async ( books, amounts ) => {
        let totalCost = 0;
        let orderItems = [];
        
        for (let i = 0; i < books.length; i++) {
            let book = await Book.findOne({ _id: books[i]});
            const { quantity, price } = book;

            if(quantity >= amounts[i])
            {
                orderItems.push({bookId: books[i], amount: amounts[i]}); 
                totalCost += price*amounts[i];
                await book.updateOne({quantity: quantity - amounts[i]});
            }
        }
        const newOrder = new Order({items: orderItems,totalPrice: totalCost});
        return newOrder.save();
    },
    getMaxTotalPrice: async (start, end) => {
        start = new Date(start);
        end = new Date(end);
        const maxPriceOrder = await Order.aggregate(
            [
                {
                '$match': {
                    'date': {
                    '$gte': start, 
                    '$lte': end
                    }
                }
                }, {
                '$sort': {
                    'totalPrice': -1
                }
                }, {
                '$limit': 1
                }
            ]
        );
        return maxPriceOrder 
        
    },
    getMostPopularGenres: async (start, end) => {
        start = new Date(start);
        end = new Date(end);
        const mostPopularGenre = await Order.aggregate(
        [
            {
            '$match': {
                'date': {
                '$gte': start, 
                '$lte': end
                }
            }
            }, {
            '$unwind': {
                'path': '$items', 
                'preserveNullAndEmptyArrays': false
            }
            }, {
            '$lookup': {
                'from': 'books', 
                'localField': 'items.bookId', 
                'foreignField': '_id', 
                'as': 'items.bookId'
            }
            }, {
            '$unwind': {
                'path': '$items.bookId', 
                'preserveNullAndEmptyArrays': false
            }
            }, {
            '$unwind': {
                'path': '$items.bookId.genres', 
                'preserveNullAndEmptyArrays': false
            }
            }, {
            '$group': {
                '_id': '$items.bookId.genres', 
                'total': {
                '$sum': '$items.amount'
                }
            }
            }, {
            '$sort': {
                'total': -1
            }
            }, {
            '$limit': 3
            }
        ]
        );
        return mostPopularGenre 
    },
    getProfitsBetweenDates: async (start, end) => {
        start = new Date(start);
        end = new Date(end);
        const profitsBetweenDates = await Order.aggregate(
            [
                {
                '$match': {
                    'date': {
                    '$gte': start, 
                    '$lte': end
                    }
                }
                }, {
                '$unwind': {
                    'path': '$items', 
                    'preserveNullAndEmptyArrays': false
                }
                }, {
                '$group': {
                    '_id': '', 
                    'total': {
                    '$sum': '$totalPrice'
                    }
                }
                }
            ]
        );
        return profitsBetweenDates;
    },
    getTop5Authors: async (start, end) => {
        start = new Date(start);
        end = new Date(end);
        const top5Authors = await Order.aggregate(
            [
                {
                  '$match': {
                    'date': {
                      '$gte': start, 
                      '$lte': end
                    }
                  }
                }, {
                  '$unwind': {
                    'path': '$items', 
                    'preserveNullAndEmptyArrays': false
                  }
                }, {
                  '$lookup': {
                    'from': 'books', 
                    'localField': 'items.bookId', 
                    'foreignField': '_id', 
                    'as': 'items.bookId'
                  }
                }, {
                  '$unwind': {
                    'path': '$items.bookId', 
                    'preserveNullAndEmptyArrays': false
                  }
                }, {
                  '$unwind': {
                    'path': '$items.bookId.authors', 
                    'preserveNullAndEmptyArrays': false
                  }
                }, {
                  '$group': {
                    '_id': '$items.bookId.authors', 
                    'totalSelling': {
                      '$sum': '$items.amount'
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'authors', 
                    'localField': '_id', 
                    'foreignField': '_id', 
                    'as': '_id'
                  }
                }, {
                  '$unwind': {
                    'path': '$_id', 
                    'preserveNullAndEmptyArrays': false
                  }
                }, {
                  '$project': {
                    '_id': '$_id.name', 
                    'totalSelling': 1
                  }
                }, {
                  '$sort': {
                    'totalSelling': -1
                  }
                }, {
                  '$limit': 5
                }
              ]
        );
        return top5Authors;
    },
}