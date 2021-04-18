import express from 'express';


const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, categoryById, remove, read, update, list, } = require('../controllers/category');
const { userById} = require('../controllers/user');


const router = express.Router();



//for categories routers

router.get('/category/:categoryId',  read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/categories' ,  list);


router.param('userId', userById);
router.param('categoryId', categoryById);



module.exports = router;