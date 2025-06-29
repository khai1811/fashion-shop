const Product = require('../models/Product');

const categoryConfig = {
    'ao-thun': { title: 'Áo thun', desc: 'T-Shirts', banner: 'banner-tshirt.jpg', query: 'Áo thun' },
    'ao-polo': { title: 'Áo Polo', desc: 'Polo Shirts', banner: 'banner-polo.jpg', query: 'Áo Polo' },
    'ao-somi': { title: 'Áo Sơmi', desc: 'Shirts', banner: 'banner-shirt.jpg', query: 'Áo Sơmi' },
    'ao-khoac': { title: 'Áo Khoác', desc: 'Jackets', banner: 'banner-jacket.jpg', query: 'Áo Khoác' },
    'ao-ni-va-len': { title: 'Áo Ni & Len', desc: 'Sweaters', banner: 'banner-sweater.jpg', query: 'Áo Ni Và Len' },
    'hoodie': { title: 'Hoodie', desc: 'Hoodie', banner: 'banner-hoodie.jpg', query: 'Hoodie' },
    'tank-top': { title: 'Tank Top - Áo Ba Lỗ', desc: 'Tank Top', banner: 'banner-tanktop.jpg', query: 'Tank Top - Áo Ba Lỗ' },
    'set-do': { title: 'Set Đồ', desc: 'Set', banner: 'banner-setdo.jpg', query: 'Set Đồ' },
    'quan-jean': { title: 'Quần Jean', desc: 'Jeans', banner: 'banner-jean.jpg', query: 'Quần Jean' },
    'quan-short': { title: 'Quần Short', desc: 'Shorts', banner: 'banner-short.jpg', query: 'Quần Short' },
    'quan-kaki': { title: 'Quần Kaki & Chino', desc: 'Kaki & Chino', banner: 'banner-kaki.jpg', query: 'Quần Kaki & Chino' },
    'quan-jogger': { title: 'Quần Jogger - Quần Dài', desc: 'Jogger & Dài', banner: 'banner-jogger.jpg', query: 'Quần Jogger - Quần Dài' },
    'quan-tay': { title: 'Quần Tây', desc: 'Trousers', banner: 'banner-quan-tay.jpg', query: 'Quần Tây' },
    'quan-boxer': { title: 'Quần Boxer', desc: 'Boxers', banner: 'banner-boxer.jpg', query: 'Quần Boxer' },
    'giay-dep': { title: 'Giày & Dép', desc: 'Shoes & Sandals', banner: 'banner-shoe.jpg', query: 'Giày & Dép' },
    'balo-tui-vi': { title: 'Balo, Túi & Ví', desc: 'Bags & Wallets', banner: 'banner-bag.jpg', query: 'Balo, Túi & Ví' },
    'non': { title: 'Nón', desc: 'Hats', banner: 'banner-hat.jpg', query: 'Nón' },
    'that-lung': { title: 'Thắt Lưng', desc: 'Belts', banner: 'banner-belt.jpg', query: 'Thắt Lưng' },
    'vo': { title: 'Vớ', desc: 'Socks', banner: 'banner-sock.jpg', query: 'Vớ' },
    'mat-kinh': { title: 'Mắt Kính', desc: 'Glasses', banner: 'banner-glasses.jpg', query: 'Mắt Kính' },
    'women': { title: 'Thời Trang Nữ', desc: 'Women Fashion', banner: 'banner-women.jpg', query: 'Nữ' },
    'men': { title: 'Thời Trang Nam', desc: 'Men Fashion', banner: 'banner-men.jpg', query: 'Nam' },
};

const showCategory = async (req, res) => {
    const slug = req.params.category;
    const config = categoryConfig[slug];
    if (!config) {
        return res.status(404).render('404', { message: 'Không tìm thấy danh mục!' });
    }
    try {
        const products = await Product.find({ category: config.query, status: 'active' });
        res.render('products/categoryList', {
            products,
            categoryTitle: config.title,
            categoryDesc: config.desc,
            categoryBanner: config.banner
        });
    } catch (err) {
        res.status(500).send('Lỗi server');
    }
};

module.exports = {
    showCategory
};
