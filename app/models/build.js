var mongoose = require('mongoose');

const BuildSchema = mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    build: {
    	type: Number,
    	default: 1 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Build', BuildSchema);