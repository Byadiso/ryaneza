import express from 'express';
const router = express.Router();


const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, productById ,read, remove, update , list, listRelated, listCategories,listBySearch,listSearch,photo } = require('../controllers/property');
const { userById} = require('../controllers/user');
// const { productById} = require('../controllers/product');


router.post('/v1/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/v1/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/v1/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/v1/product/:productId', read);
router.get('/v1/products', list);
router.get("/v1/products/search", listSearch);
router.get('/v1/products/related/:productId', listRelated);
router.get('/v1/products/categories' ,  listCategories);
router.post("/v1/products/by/search", listBySearch);
router.get("/v1/product/photo/:productId", photo);



router.param('userId', userById);
router.param('productId', productById);


module.exports = router;