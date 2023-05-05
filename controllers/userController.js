require('dotenv').config();
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Favorites = require('../models/Favorites');

const generateJwt = (id, name, email, role) => {
    return jwt.sign({id, name, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        try {
            const {name, password, email, role} = req.body;

            if(!email || !password) {
                return next(ApiError.badRequest('Неверная почта или пароль.'));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            let user = new User({name, password: hashPassword, email, role});
            user = await user.createUser();
            let [userInfo, _] = await User.findOne(email);

            let favorites = new Favorites({userId: user[0].id});

            let token = generateJwt(userInfo[0].id, name, email, userInfo[0].role);

            return res.json({token});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest('Не удалось зарегистрировать пользователся. Возможно пользователь с такой почтой уже зарегистрирован.'));
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;

        let [user, _] = await User.findOne(email);
        if(user.length == 0) {
            return next(ApiError.badRequest("Пользователя не существует"));
        }

        let comparePassword = bcrypt.compareSync(password, user[0].password);
        if(!comparePassword) {
            return next(ApiError.badRequest("Неверный email или пароль"));
        }

        const token = generateJwt(user[0].id, user[0].name, user[0].email, user[0].role);

        return res.json({token});
    }

    async check(req, res) {
        const token = generateJwt(req.user.id ,req.user.name, req.user.email, req.user.role);
        res.json({token});
    }
}

module.exports = new UserController();

