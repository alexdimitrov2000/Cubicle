const cubeModel = require('../models/models').cubeModel;

function index(req, res, next) {
    const { search = null, from = null, to = null } = { ...req.query };
    let query = {};
    if (search) {
        query = { name: { $regex: search } }
    }

    if (from) {
        query = { ...query, difficultyLevel: { $gte: from } };
    }

    if (to) {
        query.difficultyLevel = { ...query.difficultyLevel, $lte: to };
    }

    cubeModel.find(query).then(cubes => {
        res.render('index.hbs', { cubes, search, from, to });
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