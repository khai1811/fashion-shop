const Order = require('../models/Order');
const User = require('../models/User');

exports.dashboard = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');
    if (user.role === 'admin') return res.redirect('/admin/dashboard');
    const orders = await Order.find({ user_id: user._id });
    return res.render('account/dashboard', { user, orders });
};

exports.showInfo = (req, res) => {
    res.render('account/info', { user: req.session.user });
};

exports.showAddresses = async (req, res) => {
    const user = await User.findById(req.session.user._id);
    if (!user) {
        // Nếu không tìm thấy user, chuyển hướng về login hoặc hiện thông báo lỗi
        return res.redirect('/login'); // hoặc res.send('User không tồn tại!');
    }
    res.render('account/addresses', { addresses: user.addresses || [] });
};

exports.addAddress = async (req, res) => {
    if (req.body.address && req.body.address.trim() !== '') {
        await User.findByIdAndUpdate(
            req.session.user._id,
            { $push: { addresses: { address: req.body.address.trim() } } }
        );
    }
    res.redirect('/account/addresses');
};
exports.deleteAddress = async (req, res) => {
    await User.findByIdAndUpdate(
        req.session.user._id,
        { $pull: { addresses: { address: req.params.address } } }
    );
    res.redirect('/account/addresses');
};

exports.showMeasurements = (req, res) => {
    res.render('account/measurements');
};
exports.showVouchers = (req, res) => {
    res.render('account/vouchers');
};
exports.showPoints = (req, res) => {
    res.render('account/points');
};

// ---- CHỈ GIỮ 3 TRẠNG THÁI CHÍNH + TẤT CẢ ----

// Tất cả đơn hàng
exports.showAllOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id });
    res.render('account/orders', { orders });
};

// Đơn hàng chờ xử lý ("pending")
exports.showPendingOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'pending' });
    res.render('account/orders_processing', { orders });
};

// Đơn hàng đang giao ("shipping")
exports.showShippingOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'shipping' });
    res.render('account/orders_shipping', { orders });
};

// Đơn hàng đã giao
exports.showDeliveredOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'delivered' });
    res.render('account/orders_delivered', { orders });
};

// Đã xem gần đây
exports.showRecentlyViewed = (req, res) => {
    res.render('account/recent');
};
