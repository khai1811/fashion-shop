const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    phone: String,
    address: String,
    note: String,
    paymentMethod: String,
    total: Number,
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: String,         // Lưu lại tên SP lúc đặt (tránh bị đổi tên)
            price: Number,        // Lưu lại giá lúc đặt (tránh thay đổi về sau)
            image: String,
            quantity: Number
        }
    ],
    status: { type: String, default: 'pending' }, // pending, approved, shipping, delivered, cancelled
    createdAt: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
