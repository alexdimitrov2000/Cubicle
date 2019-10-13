const homeController = require('../controllers/homeController');
const cubesController = require('../controllers/cubesController');
const accessoriesController = require('../controllers/accessoriesController');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/about', homeController.about);

    app.get('/create', cubesController.getCreate);
    app.post('/create', cubesController.postCreate);

    app.get('/details/:id', cubesController.details);
    
    app.get('/create/accessory', accessoriesController.getCreate);
    app.post('/create/accessory', accessoriesController.postCreate);

    app.route('/attach/accessory/:id')
       .get(accessoriesController.getAttach)
       .post(accessoriesController.postAttach);

    app.get('*', homeController.pageNotFound);
};