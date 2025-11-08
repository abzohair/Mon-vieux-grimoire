const express = require('express');

const bookCtrl = require('../controllers/books');
const auth = require('../middleware/auth');
const { upload, imageOptimizer } = require('../middleware/image-optimizer')



const router = express.Router();

router.post('/', auth, upload, imageOptimizer, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.addRating);

router.put('/:id', auth, upload, imageOptimizer, bookCtrl.modifyBook);

router.delete('/:id', auth, bookCtrl.deleteOneBook);

router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);

module.exports = router;