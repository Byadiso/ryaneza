
import mongoose from 'mongoose';
import { number, string } from 'joi';

mongoose.Promise = global.Promise

//schema for the  database for properties
const  { ObjectId } = mongoose.Schema;
 
const propertySchema = new mongoose.Schema({
   
    owner: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
 
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
   
    image: {
        type: String,        
        
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
})
export default mongoose.model('Property', propertySchema)
