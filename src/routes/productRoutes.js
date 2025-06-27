const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route admin
router.get('/admin/products', productController.getAllProducts);
router.get('/admin/products/add', productController.getAddForm);
router.post('/admin/products/add', productController.addProduct);
router.get('/admin/products/edit/:id', productController.getEditForm);
router.post('/admin/products/edit/:id', productController.updateProduct);
router.get('/admin/products/delete/:id', productController.deleteProduct);

module.exports = router;
