import express from 'express';


import userCtrl, { userById, read, update,remove, listUsers,userPhoto, purchaseHistory, addFollower,removeFollower, addFollowing,removeFollowing } from '../controllers/user';
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

// get all users 
router.get('/v1/users/', requireSignin , listUsers);

router.get('/v1/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.put("/v1/user/follow", requireSignin, addFollowing, addFollower);
router.put("/v1/user/unfollow", requireSignin, removeFollowing, removeFollower);

// photo
router.get("/v1/user/photo/:userId", userPhoto);


router.param('userId', userById);




module.exports = router;