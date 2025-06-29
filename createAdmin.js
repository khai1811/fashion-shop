require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function createAdmin() {
    try {

        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fashion_shop');

        // Tạo mật khẩu hash
        const hashedPassword = await bcrypt.hash('Admin1234', 10);

        // Tạo user admin
        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            phone: '0123456789',
            password: hashedPassword,
            role: 'admin'
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
