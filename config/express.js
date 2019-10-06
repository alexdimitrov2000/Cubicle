const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app) => {
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
    app.set('views', path.resolve(__basedir, 'views'));
    app.use(express.static(path.resolve(__basedir, 'static')));
};