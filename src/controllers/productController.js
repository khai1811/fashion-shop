const Product = require('../models/Product');

// Hiển thị danh sách sản phẩm

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.render('admin/products/list', { products }); // <-- Đúng, trả về đúng file EJS mới!
};

// Hiển thị form thêm
exports.getAddForm = (req, res) => {
    res.render('admin/products/add');
};

// Xử lý thêm
exports.addProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';

    try {
        await Product.create({ name, price, description, image });
        res.redirect('/admin/products');
    } catch (err) {
        res.send('Lỗi thêm sản phẩm: ' + err.message);
    }
};


// Hiển thị form sửa
exports.getEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/edit', { product });
};

// Xử lý cập nhật
exports.updateProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.send('Không tìm thấy sản phẩm');

    // Nếu có ảnh mới được upload
    if (req.file) {
        product.image = '/uploads/' + req.file.filename;
    }

    product.name = name;
    product.price = price;
    product.description = description;

    await product.save();
    res.redirect('/admin/products');
};


// Xóa
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
};
// Hiển thị chi tiết sản phẩm
exports.showDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
        res.render('products/detail', { product });
    } catch (err) {
        res.status(500).send('Lỗi server: ' + err.message);
    }
};
// Hiển thị danh sách sản phẩm cho khách hàng
exports.showAllProducts = async (req, res) => {
    const products = await Product.find();
    res.render('admin/products/list.ejs', { products });
};

// Trả về chi tiết sản phẩm dạng JSON (cho Xem nhanh)
exports.apiGetProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};
