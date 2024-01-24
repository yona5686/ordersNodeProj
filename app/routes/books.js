const controller = require('../controllers/books');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.listBooks);
router.get('/:id', cacheNoStore, controller.getBook);
router.post('/', cacheNoStore, controller.createBook);

router.get('/:category/:pageNumber/:val', cacheNoStore, controller.getBookbyVal);


module.exports = router;