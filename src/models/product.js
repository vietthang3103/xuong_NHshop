import mongoose, { Schema } from "mongoose";

const productShema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
    }, 
    price: {
        type: Number,
        renquire: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
},  { timestamps: true, versionKey: false });
export default mongoose.model('Product', productShema);