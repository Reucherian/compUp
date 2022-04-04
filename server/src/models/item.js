import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;
const itemSchema = new Schema({
    itemName:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    asinUri:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    pictureUri:{
        type: String,
        required: false,
        validate (value) {
            if(!validator.isURL(value)){
                throw new Error('Picture URL is not valid')
            }
        }
    }
});
export default mongoose.model('item', itemSchema);