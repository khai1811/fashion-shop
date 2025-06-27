const Product = require('../models/Product');

exports.showHome = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ category: 'new', status: 'active' }).limit(10);
        const featuredShirts = await Product.find({ category: 'Áo thun', status: 'active' }).limit(9);
        res.render('home', { featuredProducts, featuredShirts });
    } catch (err) {
        console.error('Lỗi khi load trang chủ:', err);
        res.status(500).send('Lỗi server');
    }
};
