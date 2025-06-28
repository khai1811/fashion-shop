const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đường dẫn thư mục images
const uploadPath = 'public/images/';

// Tự động tạo thư mục images nếu chưa có
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Cấu hình lưu file với Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file không trùng nhau
    }
});

const upload = multer({ storage });

module.exports = upload;
