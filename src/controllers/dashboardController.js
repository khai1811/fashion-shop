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
