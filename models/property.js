import mongoose from 'mongoose';
const {ObjectId } = mongoose.Schema;


const propertySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:32
        },
        description:{
            type:String,
            trim:true,
            required:true,
            maxlength:2000
        },
        price:{
            type:Number,
            trim:true,
            required:true,
            maxlength:32
        },
        category:{
            type:ObjectId,
            ref:'Category',
            require:true
        },
        quantity:{
            type: Number,
            
        },
        sold:{
            type: Number,
            default: 0,
            
        },

        photo:{
            data:Buffer,
            conentType: String            
        },
        shipping:{
            require: false,
            type: Boolean
        },
        createdBy:{
            type: ObjectId,
            ref: 'USer'
        },
        whishlist: [{ type: ObjectId, ref: 'USer' }],
        comments: [
            {
            text: String,
            created: { type: Date, default: Date.now },
            createdBy: { type: ObjectId, ref: 'USer' }
            }
    ],   
         reviews: [
                {
                text: String,
                created: { type: Date, default: Date.now },
                createdBy: { type: ObjectId, ref: 'USer' }
                }
            ],  

    },
      { timestamps: true }
);



module.exports = mongoose.model("Property", propertySchema);