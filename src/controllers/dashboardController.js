const Product = require('../models/Product');
const Order = require('../models/Order');

exports.showDashboard = async (req, res) => {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    const orders = await Order.find();
    let totalRevenue = 0;
    orders.forEach(order => {
        order.items.forEach(item => {
            totalRevenue += item.price * item.quantity;
        });
    });

    res.render('admin/dashboard', {
        productCount,
        orderCount,
        totalRevenue
    });
};
exports.dashboard = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');
    if (user.role === 'admin') return res.redirect('/admin/dashboard');

    // Lấy tất cả đơn hàng của user
    const orders = await Order.find({ user_id: user._id });

    // Đếm số lượng từng trạng thái
    const shippingCount = await Order.countDocuments({ user_id: user._id, status: 'shipping' });
    const deliveredCount = await Order.countDocuments({ user_id: user._id, status: 'delivered' });
    const reviewCount = await Order.countDocuments({ user_id: user._id, status: 'review' });

    // Truyền vào view
    return res.render('account/dashboard', {
        user,
        orders,
        shippingCount,
        deliveredCount,
        reviewCount
    });
};
