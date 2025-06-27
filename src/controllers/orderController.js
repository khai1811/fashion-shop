const Order = require('../models/Order');


exports.submitOrder = async (req, res) => {
    try {
        const user_id = req.session.user?._id;
        const { name, phone, address, note, paymentMethod } = req.body;
        const cart = req.session.cart || { items: [] };
        if (!cart.items || cart.items.length === 0) return res.send('Giỏ hàng rỗng!');

        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new Order({
            user_id,
            name,
            phone,
            address,
            note,
            paymentMethod, // đúng trường model
            total,
            items: cart.items,
            status: 'pending', // chuẩn giá trị Dashboard
            created_at: new Date()
        });

        await newOrder.save();

        req.session.cart = { items: [] }; // Reset lại giỏ hàng
        res.render('checkout/success', { order: newOrder });

    } catch (err) {
        res.send('Lỗi khi đặt hàng: ' + err.message);
    }
};


exports.showCheckoutForm = (req, res) => {
    res.render('cart/checkout', { cart: req.session.cart }); // hoặc 'checkout/form' tùy file view bạn muốn!
};
