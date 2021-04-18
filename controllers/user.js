import User from "../models/user";
import { Order } from '../models/order';
import { errorHandler } from '../helper/dbErroHandler';


exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user) =>{
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    })  
}

 
exports.read = (req,res )=>{ 
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;   
    return res.json(req.profile);
}


exports.update = (req, res)=>{    
    let user = req.profile;  
     User.findOneAndUpdate(
            {_id:req.profile._id},
            {$set: req.body}, 
            {new: true},
            (err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: 'You are not authorized  to perfom this action'
                    })
                }
               user.hashed_password = undefined;
               user.salt = undefined;  
               res.json(user);
            } ) ;
        

};


exports.remove = (req, res)=>{
    let user = req.profile;
    user.remove((err, deletedUser)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            // deletedCategory, 
            message:"User deleted successfully"
        })
    })
}




exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};
