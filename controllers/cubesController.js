const cubeModel = require('../models/cube');

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

function details(req, res) {
    let cubeId = req.params.id;
    cubeModel.findById(cubeId, function (err, cube) {
        if (err) console.error(err);

        res.render('details.hbs', { cube });
    });
}

module.exports = {
    getCreate,
    postCreate,
    details
};