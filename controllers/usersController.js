const userModel = require('../models/user');
const blacklistModel = require('../models/token-blacklist');
const jwtUtil = require('../utilities/jwt');
const appConfig = require('../app-config');

function getLogin(req, res) {
    if (req.user) { res.redirect('/'); return; }

    res.render('login.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;

    userModel.findOne({ username }).then(user => Promise.all([user, user.checkPassword(password)]))
      .then(([user, match]) => {
        if (!match) {
            res.render('login.hbs', { loginMsg: 'Incorrect username or password' });
            return;
        }

        const token = jwtUtil.createToken({ id: user._id });

        res.cookie(appConfig.authCookieName, token).redirect('/');
    }).catch(next);
}

function getRegister(req, res) {
    if (req.user) { res.redirect('/'); return; }
    
    res.render('register.hbs');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('register.hbs', {
            username: username,
            errors: {
                repeatPassword: 'Password and confirmation password should match!'
            }
        });
        return;
    }

    return userModel.create({ username, password }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('register.hbs', {
                username: username,
                errors: {
                    username: 'Username is already taken!'
                }
            });
            return;
        }
        next(err);
    });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookieName];

    blacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    });
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
}