import  { errorHandler } from "../helper/dbErroHandler";
import Category from "../models/category";

exports.create = (req, res)=>{
    const category = new Category(req.body)
    category.save((err, data ) => {
        if(err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: err
            });

        }
        res.json({ 
            category:data,
            status:true ,
            message:"Your category has been successfull created"
        });
    });
};


exports.categoryById = (req, res, next, id)=>{
    Category.findById(id).exec((err, category) =>{
        if(err || !category) {
            return res.status(400).json({
                error: 'category Does not exist'
            });
        }
        req.category = category;
        next();
    })
}



exports.read = (req,res )=>{    
    return res.json(req.category);
}

exports.remove = (req, res)=>{
    let category = req.category;
    category.remove((err, deletedCategory)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: false
            });
        }
        res.json({
            // deletedCategory, 
            message:"Category deleted successfully",
            status: true
        })
    })
}




exports.update = (req, res)=>{    
        let category = req.category;
        category.name = req.body.name;
       
        category.save((err, result)=>{
            if(err){
                return res.status(404).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
        
};

exports.list = (req, res )=>{
    Category.find().exec((err, categories) =>{
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(categories)
    })
}


