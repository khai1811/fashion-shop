// controllers/adminController.js

exports.showProfile = (req, res) => {
    // Giả sử info admin lưu trong session hoặc db, ví dụ dùng req.session.user
    const admin = req.session.user; // hoặc lấy từ db nếu cần
    res.render('admin/profile', { admin });
};
