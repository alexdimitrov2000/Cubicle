const { cubeModel } = require('../models/models');

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res) {
    let { name = null, description = null, imageUrl = null, difficultyLevel = null } = { ...req.body };
    difficultyLevel = Number(difficultyLevel);
    cubeModel.create({ name, description, imageUrl, difficultyLevel }, function (err, createdCube) {
        if (err) console.error(err);
        res.redirect('/');
    });
}

function details(req, res, next) {
    let cubeId = req.params.id;
    cubeModel.findById(cubeId).populate('accessories').then((cube) => {
        res.render('details.hbs', { cube });
    }).catch(next);
}

module.exports = {
    getCreate,
    postCreate,
    details
};