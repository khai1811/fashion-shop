const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Hiển thị trang đăng ký
exports.showRegister = (req, res) => {
    res.render('auth/register', { error: null });
};

// Xử lý đăng ký
exports.register = async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, phone, password: hash });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Lỗi đăng ký:', err);
        res.render('auth/register', { error: 'Tên đăng nhập, email hoặc SĐT đã tồn tại!' });
    }
};

// Hiển thị trang đăng nhập
exports.showLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

// Xử lý đăng nhập phân quyền admin và user
exports.login = async (req, res) => {
    let { username, password } = req.body;

    username = username.trim().toLowerCase();

    try {
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (!user) {
            return res.render('auth/login', { error: 'Sai tài khoản hoặc mật khẩu' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', { error: 'Sai tài khoản hoặc mật khẩu' });
        }

        req.session.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        console.error('Lỗi đăng nhập:', err);
        res.render('auth/login', { error: 'Lỗi server, vui lòng thử lại sau.' });
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

// Hiển thị form Quên mật khẩu
exports.showForgot = (req, res) => {
    res.render('auth/forgot-password', { error: null });
};

// Xử lý form Quên mật khẩu (demo)
exports.forgot = (req, res) => {
    const { email } = req.body;
    res.send(`Email khôi phục đã gửi đến: ${email}`);
};
