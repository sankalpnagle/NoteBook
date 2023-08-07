const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const notesSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }

});

const noteModel = mongoose.model('note', notesSchema)
module.exports = noteModel;