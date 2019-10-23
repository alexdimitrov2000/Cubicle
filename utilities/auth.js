const appConfig = require('../app-config');
const jwt = require('./jwt');
const userModel = require('../models/user');
const blacklistModel = require('../models/token-blacklist');

function authorize(loginRedirect = true) {
    return function (req, res, next) {
        const token = req.cookies[appConfig.authCookieName] || '';

        Promise.all([jwt.verifyToken(token), blacklistModel.findOne({ token })]).then(([verified, isTokenBlacklisted]) => {
            if (isTokenBlacklisted) {
                return Promise.reject(new Error('the token is blacklisted'));
            }

            userModel.findById(verified.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!loginRedirect) { next(); return; }
            
            if (['jwt must be provided', 'the token is blacklisted'].includes(err.message)) {
                res.redirect('/login');
                return;
            }

            next(err);
        });
    }
}

module.exports = {
    authorize
}