const controller = require('../controllers/orders');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.listOrders);
router.get('/:id', cacheNoStore, controller.getOrder);
router.post('/', cacheNoStore, controller.createOrder);

router.get('/category/:name', cacheNoStore, controller.getByVal);


module.exports = router;