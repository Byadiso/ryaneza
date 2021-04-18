import express from 'express';
const router = express.Router();


const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, productById ,read, remove, update , list, listRelated, listCategories,listBySearch,listSearch,photo } = require('../controllers/property');
const { userById} = require('../controllers/user');
// const { productById} = require('../controllers/product');


router.post('/api/v1/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/api/v1/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/api/v1/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/api/v1/product/:productId', read);
router.get('/api/v1/products', list);
router.get("/api/v1/products/search", listSearch);
router.get('/api/v1/products/related/:productId', listRelated);
router.get('/api/v1/products/categories' ,  listCategories);
router.post("/api/v1/products/by/search", listBySearch);
router.get("/api/v1/product/photo/:productId", photo);



router.param('userId', userById);
router.param('productId', productById);


module.exports = router;