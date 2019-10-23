const homeController = require('../controllers/homeController');
const cubesController = require('../controllers/cubesController');
const accessoriesController = require('../controllers/accessoriesController');
const usersController = require('../controllers/usersController');
const authUtil = require('../utilities/auth');

module.exports = (app) => {
   app.get('/', homeController.index);

   app.get('/about', homeController.about);

   app.get('/create', authUtil.authorize(), cubesController.getCreate);
   app.post('/create', authUtil.authorize(), cubesController.postCreate);

   app.get('/details/:id', authUtil.authorize(false), cubesController.details);

   app.get('/create/accessory', accessoriesController.getCreate);
   app.post('/create/accessory', accessoriesController.postCreate);

   app.get('/logout', authUtil.authorize(), usersController.logout);

   app.get('/edit/:id', authUtil.authorize(), cubesController.getEdit);
   app.post('/edit/:id', authUtil.authorize(), cubesController.postEdit);
   
   app.get('/delete/:id', authUtil.authorize(), cubesController.getDelete);
   app.post('/delete/:id', authUtil.authorize(), cubesController.postDelete);

   app.get('/attach/accessory/:id', authUtil.authorize(), accessoriesController.getAttach);
   app.post('/attach/accessory/:id', authUtil.authorize(), accessoriesController.postAttach);

   app.get('/login', authUtil.authorize(false), usersController.getLogin);
   app.post('/login', authUtil.authorize(false), usersController.postLogin);

   app.get('/register', authUtil.authorize(false), usersController.getRegister);
   app.post('/register', authUtil.authorize(false), usersController.postRegister);

   app.get('*', homeController.pageNotFound);
};