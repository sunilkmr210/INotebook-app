const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {type:String, required: true},
    description: {type:String, required: true},
    tag: {type:String},
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('note', noteSchema);