
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

  res.redirect(`/account/orders/success/${orderId}`);
};
