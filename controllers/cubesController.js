const { cubeModel } = require('../models/models');

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res) {
    let { name = null, description = null, imageUrl = null, difficultyLevel = null } = { ...req.body };
    difficultyLevel = Number(difficultyLevel);
    const user = req.user;
    cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id }, function (err, createdCube) {
        if (err) console.error(err);
        res.redirect('/');
    });
}

function getEdit(req, res) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.findOne({ _id: id, creatorId: user._id }).then((cube) => {
        const options = [
            { name: "1 - Very Easy", isSelected: 1 === cube.difficultyLevel },
            { name: "2 - Easy", isSelected: 2 === cube.difficultyLevel },
            { name: "3 - Medium (Standard 3x3)", isSelected: 3 === cube.difficultyLevel },
            { name: "4 - Intermediate", isSelected: 4 === cube.difficultyLevel },
            { name: "5 - Expert", isSelected: 5 === cube.difficultyLevel },
            { name: "6 - Hardcore", isSelected: 6 === cube.difficultyLevel },
        ];

        res.render('editCube.hbs', { cube, options });
    });
}

function postEdit(req, res, next) {
    const id = req.params.id;
    let { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    difficultyLevel = Number(difficultyLevel) + 1;
    const user = req.user;

    cubeModel.updateOne({ _id: id, creatorId: user._id }, { name, description, imageUrl, difficultyLevel }).then(() => {
        res.redirect(`/details/${id}`);
    }).catch(next);
}

function getDelete(req, res) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.findOne({ _id: id, creatorId: user._id }).then((cube) => {
        const options = [
            { name: "1 - Very Easy", isSelected: 1 === cube.difficultyLevel },
            { name: "2 - Easy", isSelected: 2 === cube.difficultyLevel },
            { name: "3 - Medium (Standard 3x3)", isSelected: 3 === cube.difficultyLevel },
            { name: "4 - Intermediate", isSelected: 4 === cube.difficultyLevel },
            { name: "5 - Expert", isSelected: 5 === cube.difficultyLevel },
            { name: "6 - Hardcore", isSelected: 6 === cube.difficultyLevel },
        ];

        res.render('deleteCube.hbs', { cube, options });
    });
}

function postDelete(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.deleteOne({ _id: id, creatorId: user._id }).then(() => {
        res.redirect('/');
    }).catch(next);
}

function details(req, res, next) {
    let cubeId = req.params.id;
    const user = req.user;

    cubeModel.findById(cubeId).populate('accessories').then((cube) => {
        const isCreator = cube.creatorId.toString() === user._id.toString();
        res.render('details.hbs', { cube, isCreator });
    }).catch(next);
}

module.exports = {
    getCreate,
    postCreate,
    details,
    getEdit,
    postEdit,
    getDelete,
    postDelete
};