// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    phone: String,
    address: String,
    note: String,
    paymentMethod: String, // SỬA thành camelCase cho đồng nhất
    total: Number,
    items: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ],
    status: { type: String, default: 'pending' }, // giá trị chuẩn cho Dashboard
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
