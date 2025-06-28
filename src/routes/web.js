const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const adminOrderController = require('../controllers/adminOrderController');
const dashboardController = require('../controllers/dashboardController');
const { requireLogin, requireAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const accountController = require('../controllers/accountController');
const categoryController = require('../controllers/categoryController');
// Trang chủ & sản phẩm (public)
router.get('/', homeController.showHome);
router.get('/products', productController.showAllProducts);
router.get('/products/:id', productController.showDetail);

router.get('/collections/:category', categoryController.showCategory); // Đúng

router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Giỏ hàng & đặt hàng
router.get('/cart', cartController.viewCart);
router.post('/cart/add/:id', cartController.addToCart);
router.get('/cart/remove/:id', cartController.removeFromCart);

// Đặt hàng
router.get('/checkout', requireLogin, orderController.showCheckoutForm);
router.post('/checkout', requireLogin, orderController.submitOrder);

router.get('/admin/dashboard', requireLogin, requireAdmin, dashboardController.showDashboard);
// Cập nhật trạng thái đơn hàng (admin)
router.post('/admin/orders/:id/update', requireLogin, requireAdmin, adminOrderController.updateOrderStatus);

// Quản lý sản phẩm (admin)
router.get('/admin/products', requireLogin, requireAdmin, productController.getAllProducts);
router.get('/admin/products/add', requireLogin, requireAdmin, productController.getAddForm);
router.post('/admin/products/add', requireLogin, requireAdmin, upload.single('images'), productController.addProduct);
router.get('/admin/products/edit/:id', requireLogin, requireAdmin, productController.getEditForm);
router.post('/admin/products/edit/:id', requireLogin, requireAdmin, upload.single('images'), productController.updateProduct);
router.get('/admin/products/delete/:id', requireLogin, requireAdmin, productController.deleteProduct);

// Quản lý đơn hàng (admin)
router.get('/admin/orders', requireLogin, requireAdmin, adminOrderController.listOrders);
router.get('/admin/orders/:id', requireLogin, requireAdmin, adminOrderController.viewOrder);
router.get('/admin/orders', adminOrderController.listOrders);
// Quên mật khẩu
router.get('/forgot-password', authController.showForgot);
router.post('/forgot-password', authController.forgot);

// Tài khoản của tôi (user)
router.get('/account/dashboard', requireLogin, accountController.dashboard);
router.get('/account/info', requireLogin, accountController.showInfo);
router.get('/account/addresses', requireLogin, accountController.showAddresses);
router.get('/account/measurements', requireLogin, accountController.showMeasurements);
router.get('/account/vouchers', requireLogin, accountController.showVouchers);
router.get('/account/points', requireLogin, accountController.showPoints);

// Đơn hàng của tôi (user)
router.get('/account/orders', requireLogin, accountController.showAllOrders);
router.get('/account/orders/pending', requireLogin, accountController.showPendingOrders);
router.get('/account/orders/ready', requireLogin, accountController.showReadyOrders);
router.get('/account/orders/shipping', requireLogin, accountController.showShippingOrders);
router.get('/account/orders/delivered', requireLogin, accountController.showDeliveredOrders);
router.get('/account/orders/review', requireLogin, accountController.showReviewOrders);
router.get('/account/orders/reviewed', requireLogin, accountController.showReviewedOrders);
router.get('/account/orders/canceled', requireLogin, accountController.showCanceledOrders);
router.get('/account/orders/returned', requireLogin, accountController.showReturnedOrders);

router.get('/account/recent', requireLogin, accountController.showRecentlyViewed);

// API (dạng JSON)
router.get('/api/products/:id', productController.apiGetProduct);

module.exports = router;
