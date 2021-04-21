import express from 'express';


import userCtrl, { userById, read, update,remove, purchaseHistory } from '../controllers/user';
import { requireSignin, isAuth, isAdmin } from '../controllers/auth';
const router = express.Router();



// router.get('/secret/:userId', requireSignin ,isAuth, isAdmin,  (req, res)=>{
//     res.json({
//         user: req.profile
//     });
// });
router.get('/v1/user/:userId', requireSignin ,isAuth, read);
router.put('/v1/user/:userId', requireSignin ,isAuth, update);
router.delete('/v1/user/:userId', requireSignin ,isAuth,isAdmin, remove);

router.get('/v1/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId', userById);




module.exports = router;