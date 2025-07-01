const Product = require('../models/Product');

exports.viewCart = (req, res) => {
    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }
    if (typeof req.session.cart.totalPrice !== 'number') {
        req.session.cart.totalPrice = req.session.cart.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0
        );
    }
    res.render('cart/index', { cart: req.session.cart });
};

exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) return res.json({ success: false, message: 'Sản phẩm không tồn tại' });

        if (!req.session.cart) {
            req.session.cart = { items: [], totalPrice: 0 };
        }
        const cart = req.session.cart;

        // Tìm item theo product_id
        const existingItem = cart.items.find(p => p.product_id && p.product_id.toString() === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                product_id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        return res.json({ success: true, count });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err.message });
    }
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }
    const cart = req.session.cart;

    cart.items = cart.items.filter(item => item.product_id && item.product_id.toString() !== productId);

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    res.render('cart/index', { cart: req.session.cart });

};
