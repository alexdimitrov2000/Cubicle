const homeController = require('../controllers/homeController');
const cubesController = require('../controllers/cubesController');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/about', homeController.about);

    app.get('/create', cubesController.getCreate);
    app.post('/create', cubesController.postCreate);

    app.get('/details/:id', cubesController.details);

    app.get('*', homeController.pageNotFound);
};