// src/controllers/bankController.js
exports.bankPayment = (req, res) => {
  const orderId = req.params.orderId;
  const qrImageUrl = '/images/bank-qr-code.png';
  res.render('bankPayment', {
    qrImageUrl,
    orderId
  });
};
exports.bankPaymentCallback = async (req, res) => {
  const orderId = req.params.orderId;

  // Xử lý xác nhận thanh toán thành công với orderId ở đây

  // Sau khi xử lý thành công, chuyển về trang đơn hàng đã đặt thành công
  res.redirect(`/account/orders/success/${orderId}`);
};
