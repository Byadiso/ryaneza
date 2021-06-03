import User  from "../models/user";
import jwt from 'jsonwebtoken'; 
import expressJwt from 'express-jwt'; // for authorization check 
// let uuidv1 = require('uuidv1');
import {errorHandler} from '../helper/dbErroHandler';

 
 
 export function signup (req,res){
    console.log('req.body' , req.body);
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err) {
            return res.status(400).json({
                err:errorHandler(err),
                // err:err,
                status: false,
                message: 'Email already exist!'
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.status(200).json({
            user : user,
            status:true,
            message:'user created successful'
        });
    })
 }




 exports.signin = (req,res) =>{
   //find the user based on email 

   const {email, password } = req.body;
   User.findOne({email}, (err, user) =>{
        if (err || !user ){
            return res.status(400).json({
                error: "User with that email does not exist. Please signup",
                status: false
            });
        }
        // if user is found make sure that the email and passwword match

        // create authenticate method in user model 
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password does not match',
                status: false
            })
        }
        // generate a signed token with uer id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //retunr response with the user and token to froned client 
        const {_id, name, email, role } = user;
        return res.status(200).json({token,status:true, user: {_id, email, name, role }})
   });
 };


 exports.signout = (req, res ) =>{
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
 }


 exports.requireSignin = expressJwt({
    // secret: process.env.JWT_SECRET,
    secret:'hgjhjdgdhgjdhglaskdaghnbgfnbgfgfgfg',
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });


  exports.isAuth = (req,res , next )=>{
      let user = req.profile && req.auth && req.profile._id == req.auth._id
      if(!user){
          return res.status(403).json({
              error: " Access denied"
          });
      }
      next();
  };



  exports.isAdmin = (req,res, next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error: " Admin ressource! Access denied"
        });
    }
    next();
  }