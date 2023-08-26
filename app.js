require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express();
const bodyp = require('body-parser');

app.use(bodyp.json());
app.use(bodyp.urlencoded({ extended: true }));
app.use(cors());

//Import Middleware
const auth = require('./src/middleware/auth');

//Import Controller
const { getService } = require('./src/controller/guestController');
const { userRegist, userLogin } = require('./src/controller/authController');

const { getProfile, userService } = require('./src/controller/userController');

//Routes List
app.post('/auth/register', userRegist);
app.post('/auth/login', userLogin);

//User Routes
app.get('/user/me', auth, getProfile);
app.all('/user/*', auth, userService);

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome to Panenesia Service'
    });
});

//Guest Routes
app.get('*', getService);

module.exports = app;