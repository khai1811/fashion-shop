const Product = require('../models/Product');

exports.viewCart = (req, res) => {
    // Luôn đảm bảo cart luôn có đủ fields
    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }
    // Nếu chưa tính totalPrice thì tính lại
    if (typeof req.session.cart.totalPrice !== 'number') {
        req.session.cart.totalPrice = req.session.cart.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0
        );
    }
    res.render('cart/index', { cart: req.session.cart });
};


// Thêm sản phẩm vào giỏ hàng (AJAX)
exports.addToCart = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return res.json({ success: false });

    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }

    const cart = req.session.cart;
    const existingItem = cart.items.find(p => p._id == productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Đếm tổng số sản phẩm
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    // Trả về JSON để JS cập nhật badge
    res.json({ success: true, count: count });
};


// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = (req, res) => {
    const productId = req.params.id;

    if (!req.session.cart) {
        req.session.cart = {
            items: [],
            totalPrice: 0
        };
    }

    const cart = req.session.cart;

    cart.items = cart.items.filter(item => item._id != productId);

    // Cập nhật lại tổng tiền
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    res.redirect('/cart');
};
