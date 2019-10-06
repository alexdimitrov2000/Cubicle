const cubeModel = require('../models/cube');
// const bodyParser = require('body-parser');

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res) {
    let { name = null, description = null, imageUrl = null, difficultyLevel = null } = { ...req.body };
    let cube = cubeModel.create(name, description, imageUrl, Number(difficultyLevel));

    cubeModel.insert(cube).then(createdCube => {
        console.log(createdCube);
        res.redirect('/');
    });
}

function details(req, res) {
    let cubeId = Number(req.params.id);
    cubeModel.getSingle(cubeId).then(cube => {
        res.render('details.hbs', { cube });
    });
}

module.exports = {
    getCreate,
    postCreate,
    details
};