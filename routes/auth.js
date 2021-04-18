import express from 'express';

const router = express.Router();

import  { signup, signin , signout, requireSignin } from '../controllers/auth';
import { userSignupValidator } from '../validator';


router.post('/v1/signup', userSignupValidator , signup);
router.post('/v1/login', signin);
router.get('/v1/signout', signout);

http://localhost:3000/api/v1/login

module.exports = router;