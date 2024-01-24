const controller = require('../controllers/authors');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.listAuthors);
router.get('/:id', cacheNoStore, controller.getAuthor);
router.post('/', cacheNoStore, controller.createAuthor);
router.patch('/', cacheNoStore, controller.updateAuthor);
router.get('/:pageNumber/:id', cacheNoStore, controller.getAllBooks);

// GET localhost:3000/5/a -> router.get("/:paramName/:param2") -> req.params -> {paramName: 5, param2:a}
// GET localhost:3000/?someParam=5&otherparam=a -> router.get("/") -> req.query -> {someParam:5, otherparam="a"}



module.exports = router;