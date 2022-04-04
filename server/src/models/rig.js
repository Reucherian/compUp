import mongoose from 'mongoose';
const { Schema } = mongoose;
import itemSchema from './item.js';
const rigSchema = new Schema({
    rigName:{
        type: String,
        required: true
    },
    downVotes:{
        type: Array,
        required: true,
        default: []
    },
    upVotes:{
        type: Array,
        required: true,
        default: []
    },
    creator:{
        type: String,
        required: true
    },
    parts:[itemSchema.schema]
});

export default mongoose.model('rig', rigSchema); 