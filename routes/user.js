import express from 'express';


import { userById, read, update,remove, purchaseHistory } from '../controllers/user';
import { requireSignin, isAuth, isAdmin } from '../controllers/auth';
const router = express.Router();



// router.get('/secret/:userId', requireSignin ,isAuth, isAdmin,  (req, res)=>{
//     res.json({
//         user: req.profile
//     });
// });
router.get('/user/:userId', requireSignin ,isAuth, read);
router.put('/user/:userId', requireSignin ,isAuth, update);
router.delete('/user/:userId', requireSignin ,isAuth,isAdmin, remove);

router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId', userById);




module.exports = router;