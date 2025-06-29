const Order = require('../models/Order');

//  TẠO ĐƠN HÀNG MỚI (CUSTOMER ĐẶT HÀNG)
exports.submitOrder = async (req, res) => {
    try {
        const user_id = req.session.user?._id;
        const { name, phone, address, note, paymentMethod } = req.body;
        const cart = req.session.cart || { items: [] };

        if (!cart.items || cart.items.length === 0)
            return res.send('Giỏ hàng rỗng!');

        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Đảm bảo từng item có product_id (ObjectId tham chiếu Product)
        const items = cart.items.map(item => ({
            product_id: item.product_id,         // CHÍNH LÀ id của Product
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));

        const newOrder = new Order({
            user_id,
            name,
            phone,
            address,
            note,
            paymentMethod,
            total,
            items,
            status: 'pending',
            createdAt: new Date()
        });

        await newOrder.save();

        req.session.cart = { items: [] }; // Reset lại giỏ hàng
        res.render('checkout/success', { order: newOrder });

    } catch (err) {
        res.send('Lỗi khi đặt hàng: ' + err.message);
    }
};

// 2. SHOW FORM THANH TOÁN
exports.showCheckoutForm = (req, res) => {
    res.render('cart/checkout', { cart: req.session.cart });
};

// 3. ADMIN - DANH SÁCH ĐƠN HÀNG
exports.listOrders = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng, có thông tin user
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user_id');
        res.render('admin/orders/list', { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};

// 4. ADMIN - XEM CHI TIẾT ĐƠN HÀNG
exports.viewOrder = async (req, res) => {
    try {
        // Populate cả user và sản phẩm cho từng item
        const order = await Order.findById(req.params.id)
            .populate('user_id')
            .populate('items.product_id');
        if (!order) return res.redirect('/admin/orders');
        res.render('admin/orders/detail', { order });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};

// 5. ADMIN - CẬP NHẬT TRẠNG THÁI ĐƠN
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Order.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/admin/orders/' + req.params.id);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};
