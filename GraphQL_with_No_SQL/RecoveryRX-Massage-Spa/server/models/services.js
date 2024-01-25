import mongoose from 'mongoose'
import { Schema, model } from "mongoose";

const priceSchema = new Schema({
    min60: {
        type: String,
        default: '$80'
    },
    min90: {
        type: String,
        default: '$140'
    }
}, { _id: false });  

const servicesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: [priceSchema],  // array of priceSchema objects
    },
    image: {
        type: String
    }
});

const Service = model("Service", servicesSchema);

export default Service