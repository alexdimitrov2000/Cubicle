const cubeModel = require('../models/cube');

function index(req, res, next) {
    // cubeModel.getAll().then(cubes => {
    //     const { search = null, from = null, to = null } = { ...req.query };
    //     if (search) {
    //         cubes = cubes.filter(c => c.name.includes(search));
    //     }

    //     if (from) {
    //         cubes = cubes.filter(c => c.difficultyLevel >= from);
    //     }
        
    //     if (to) {
    //         cubes = cubes.filter(c => c.difficultyLevel <= to);
    //     }
        
    //     res.render('index.hbs', { cubes, search, from, to });
    // }).catch(next);

    cubeModel.find().then(cubes => {
        res.render('index.hbs', { cubes });
    })
}

function about(req, res) {
    res.render('about.hbs');
}

function pageNotFound(req, res) {
    res.render('404.hbs');
}

module.exports = {
    index,
    about,
    pageNotFound
};