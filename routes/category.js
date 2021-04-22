import express from 'express';


const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, categoryById, remove, read, update, list, } = require('../controllers/category');
const { userById} = require('../controllers/user');


const router = express.Router();



//for categories routers

router.get('/v1/category/:categoryId',  read);
router.post('/v1/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/v1/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/v1/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/v1/categories' ,  list);


router.param('userId', userById);
router.param('categoryId', categoryById);



module.exports = router;