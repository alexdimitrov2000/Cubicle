const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const secret = 'sssecrettt';

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.engine('.hbs', handlebars({
        extname: '.hbs', 
        defaultLayout: '_layout',
        layoutsDir: 'views',
        partialsDir: 'views/partials'
    }));
    app.set('views', path.resolve(__basedir, 'views'));
    app.use(express.static(path.resolve(__basedir, 'static')));
};