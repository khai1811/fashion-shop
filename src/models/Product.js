// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String }, // đường dẫn hình ảnh
//     description: { type: String },
//     createdAt: { type: Date, default: Date.now },

// });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // đường dẫn hình ảnh
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    category: { type: String },
    status: { type: String } // bạn nên thêm 2 trường này vì trong form có dùng
});

module.exports = mongoose.model('Product', productSchema);
