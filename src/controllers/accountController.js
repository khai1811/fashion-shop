const Order = require('../models/Order');



exports.dashboard = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');
    if (user.role === 'admin') return res.redirect('/admin/dashboard');

    // Lấy tất cả đơn hàng của user
    const orders = await Order.find({ user_id: user._id });

    // Truyền cả user và orders vào view
    return res.render('account/dashboard', { user, orders });
};



exports.showInfo = (req, res) => {
    res.render('account/info', { user: req.session.user });
};
exports.showAddresses = (req, res) => {
    res.render('account/addresses');
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

// Các trạng thái đơn hàng:
exports.showAllOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id });
    res.render('account/orders', { orders });
};
exports.showPendingOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'pending' });
    res.render('account/orders', { orders });
};
exports.showReadyOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'ready' });
    res.render('account/orders_ready', { orders });
};
exports.showShippingOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'shipping' });
    res.render('account/orders_shipping', { orders });
};
exports.showDeliveredOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'delivered' });
    res.render('account/orders_delivered', { orders });
};
exports.showReviewOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'review' });
    res.render('account/orders_review', { orders });
};
exports.showReviewedOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'reviewed' });
    res.render('account/orders_reviewed', { orders });
};
exports.showCanceledOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'canceled' });
    res.render('account/orders_canceled', { orders });
};
exports.showReturnedOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.session.user._id, status: 'returned' });
    res.render('account/orders_returned', { orders });
};
exports.showRecentlyViewed = (req, res) => {
    res.render('account/recent');
};
