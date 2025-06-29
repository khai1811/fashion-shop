document.addEventListener('DOMContentLoaded', function () {
    // ===== Nút Thêm vào giỏ hàng =====
    document.querySelectorAll('.btn-add-to-cart').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const id = btn.getAttribute('data-id');

            fetch('/cart/add/' + id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        document.querySelectorAll('.cart-badge').forEach(badge => {
                            badge.textContent = data.count;
                        });
                        alert('Đã thêm vào giỏ!');
                    } else if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        alert('Lỗi khi thêm vào giỏ!');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Lỗi server!');
                });
        });
    });

    // ===== Nút Xem giỏ hàng nhỏ =====
    var cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.onclick = function () {
            var miniCartModal = document.getElementById('miniCartModal');
            if (miniCartModal) {
                var bsModal = new bootstrap.Modal(miniCartModal);
                bsModal.show();
            }
        };
    }
});


// ===== Mở modal xem nhanh sản phẩm =====
function openQuickView(productId) {
    fetch('/api/products/' + productId)
        .then(res => res.json())
        .then(product => {
            document.getElementById('quickViewTitle').textContent = product.name;
            document.getElementById('quickViewPrice').textContent = product.price.toLocaleString('vi-VN') + '₫';
            document.getElementById('quickViewDesc').textContent = product.description || '';
            document.getElementById('quickViewImage').src = '/images/' + product.image;
            document.getElementById('quickViewOldPrice').textContent = product.oldPrice
                ? product.oldPrice.toLocaleString('vi-VN') + '₫' : '';

            document.getElementById('quickViewAddToCart').onclick = function () {
                addToCart(productId, document.getElementById('quickViewQty').value);
            };

            const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
            modal.show();
        })
        .catch(err => {
            console.error('Lỗi khi lấy thông tin sản phẩm:', err);
            alert('Không thể hiển thị sản phẩm!');
        });
}


// ===== Thêm sản phẩm vào giỏ hàng từ modal xem nhanh =====
function addToCart(productId, quantity = 1) {
    fetch('/cart/add/' + productId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: parseInt(quantity) || 1 })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.querySelectorAll('.cart-badge').forEach(badge => {
                    badge.textContent = data.count;
                });
                alert('Đã thêm vào giỏ!');
            } else if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                alert('Thêm giỏ hàng thất bại!');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Lỗi khi thêm vào giỏ hàng!');
        });
}
