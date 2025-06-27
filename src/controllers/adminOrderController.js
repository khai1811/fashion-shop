const Order = require('../models/Order');


exports.listOrders = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng trong DB, không lọc user
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user_id');
        res.render('admin/orders/list', { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};
exports.viewOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user_id').populate('items.product_id');
        if (!order) return res.redirect('/admin/orders');
        res.render('admin/orders/detail', { order });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};

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
