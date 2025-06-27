require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User'); // Đường dẫn tùy theo dự án của bạn

async function createAdmin() {
    try {
        // Kết nối database
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fashion_shop'); // Thay yourdbname bằng tên db bạn đang dùng

        // Tạo mật khẩu hash
        const hashedPassword = await bcrypt.hash('Admin1234', 10); // Mật khẩu admin mới (thay đổi nếu muốn)

        // Tạo user admin
        const adminUser = new User({
            username: 'admin',       // Tên đăng nhập admin
            email: 'admin@example.com', // Email admin
            phone: '0123456789',     // Số điện thoại admin
            password: hashedPassword,
            role: 'admin'            // Role admin để phân quyền
        });

        await adminUser.save();
        console.log('Tạo tài khoản admin thành công!');
    } catch (err) {
        console.error('Lỗi khi tạo tài khoản admin:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
