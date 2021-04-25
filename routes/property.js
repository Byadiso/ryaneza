import express from 'express';
const router = express.Router();


const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, productById ,read, remove, update , list,listByUser, listRelated, listCategories,listBySearch,listSearch,photo,like,
    unlike,
    comment,
    uncomment,
    updateComment } = require('../controllers/property');
const { userById} = require('../controllers/user');
// const { productById} = require('../controllers/product');


router.post('/v1/property/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/v1/property/:propertyId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/v1/property/:propertyId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/v1/property/:propertyId', read);
router.get('/v1/properties', list);
router.get("/v1/properties/search", listSearch);
router.get('/v1/properties/related/:propertyId', listRelated);
router.get('/v1/properties/categories' ,  listCategories);
router.post("/v1/properties/by/search", listBySearch);
router.get('/v1/properties/:userId', listByUser);
router.get("/v1/property/photo/:propertyId", photo);

// like unlike
router.put('/v1/property/like', requireSignin, like);
router.put('/v1/property/unlike', requireSignin, unlike);

// comments
router.put('/v1/property/comment', requireSignin, comment);
router.put('/v1/property/uncomment', requireSignin, uncomment);
router.put('/v1/property/updatecomment', requireSignin, updateComment);



router.param('userId', userById);
router.param('propertyId', productById);


module.exports = router;