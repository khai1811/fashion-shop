
// document.addEventListener('DOMContentLoaded', function () {
//     var cartIcon = document.getElementById('cartIcon');
//     if (cartIcon) {
//         cartIcon.onclick = function () {
//             var miniCartModal = document.getElementById('miniCartModal');
//             if (miniCartModal) {
//                 var bsModal = new bootstrap.Modal(miniCartModal);
//                 bsModal.show();
//             }
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
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
                        // Cập nhật số lên badge
                        document.querySelectorAll('.cart-badge').forEach(badge => {
                            badge.textContent = data.count;
                        });
                    } else {
                        alert('Lỗi khi thêm vào giỏ!');
                    }
                })
                .catch(err => alert('Lỗi server!'));
        });
    });
});



function openQuickView(productId) {
    // fetch sản phẩm hoặc lấy từ biến JS hiện tại
    fetch('/api/products/' + productId)
        .then(res => res.json())
        .then(product => {
            document.getElementById('quickViewTitle').textContent = product.name;
            document.getElementById('quickViewPrice').textContent = product.price.toLocaleString('vi-VN') + '₫';
            document.getElementById('quickViewDesc').textContent = product.description;
            document.getElementById('quickViewImage').src = '/images/' + product.image;
            document.getElementById('quickViewOldPrice').textContent = product.oldPrice
                ? product.oldPrice.toLocaleString('vi-VN') + '₫' : '';
            // ... set các trường khác nếu có

            // Gán lại id sản phẩm cho nút "Thêm vào giỏ hàng" hoặc xử lý callback
            document.getElementById('quickViewAddToCart').onclick = function () {
                addToCart(productId, document.getElementById('quickViewQty').value);
            };
            // Mở modal
            const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
            modal.show();
        });
}



// public/js/main.js
document.addEventListener('DOMContentLoaded', function () {
    if (!window.VNDb) return;

    function renderOptions(data, el) {
        el.innerHTML = '<option value="">Chọn</option>' + data.map(
            v => `<option value="${v.name}">${v.name}</option>`
        ).join('');
    }

    const db = window.VNDb;
    const provinceEl = document.getElementById('province');
    const districtEl = document.getElementById('district');
    const wardEl = document.getElementById('ward');

    if (!provinceEl || !districtEl || !wardEl) return;

    renderOptions(db.province, provinceEl);

    provinceEl.onchange = function () {
        let code = db.province.find(p => p.name == this.value)?.code;
        if (!code) {
            districtEl.innerHTML = '<option value="">Chọn quận/huyện</option>';
            districtEl.disabled = true;
            wardEl.innerHTML = '<option value="">Chọn phường/xã</option>';
            wardEl.disabled = true;
            return;
        }
        let districts = db.district.filter(d => d.parent_code == code);
        renderOptions(districts, districtEl);
        districtEl.disabled = false;
        wardEl.innerHTML = '<option value="">Chọn phường/xã</option>';
        wardEl.disabled = true;
    };
    districtEl.onchange = function () {
        let provinceCode = db.province.find(p => p.name == provinceEl.value)?.code;
        let code = db.district.find(d => d.name == this.value && d.parent_code == provinceCode)?.code;
        if (!code) {
            wardEl.innerHTML = '<option value="">Chọn phường/xã</option>';
            wardEl.disabled = true;
            return;
        }
        let wards = db.ward.filter(w => w.parent_code == code);
        renderOptions(wards, wardEl);
        wardEl.disabled = false;
    };
});
