
exports.showProfile = (req, res) => {
    const admin = req.session.user;
    res.render('admin/profile', { admin });
};