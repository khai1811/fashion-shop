
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT;
const session = require('express-session');
const authMiddleware = require('./middlewares/authMiddleware');
const productRoutes = require('./routes/productRoutes');
require('./config/database');
const webRoutes = require('./routes/web');
const mongoose = require('mongoose');



app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

// app.use((req, res, next) => {
//     if (!req.session.user) {
//         req.session.user = {
//             _id: "64abc123456789abcdef0123",
//             username: "admin",
//             role: "admin"
//         };
//     }
//     next();
// });


// server.js hoặc app.js
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.cart = req.session.cart || { items: [] };
    next();
});



// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/', productRoutes);
app.use('/', webRoutes);
// Start
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
