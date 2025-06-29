

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    category: { type: String },
    status: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
