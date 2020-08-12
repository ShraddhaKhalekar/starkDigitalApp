const mongoose = require('mongoose');
const { json } = require('express');
const schema = mongoose.Schema;

// Define schema
let dataSchema = new mongoose.Schema({
    data: {
        type: Array
    }
}, {
    collection: 'data'
})

module.exports = mongoose.model('Data', dataSchema)