const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đường dẫn lưu ảnh
const uploadPath = 'public/images/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Hàm chuyển tên file về không dấu, không khoảng trắng, chỉ chữ, số, dấu chấm
function toSlug(filename) {
    // Lấy tên không tính phần đuôi mở rộng
    const ext = path.extname(filename);
    let name = path.basename(filename, ext);
    // Chuyển không dấu, thay khoảng trắng bằng dấu gạch ngang, loại bỏ ký tự lạ
    name = name.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();
    return name + ext.toLowerCase();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, toSlug(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
