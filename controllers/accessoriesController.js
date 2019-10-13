const { accessoryModel, cubeModel } = require('../models/models');

function getCreate(req, res) {
    res.render('createAccessory.hbs');
}

function postCreate(req, res) {
    let { name = null, description = null, imageUrl = null } = { ...req.body };
    accessoryModel.create({ name, description, imageUrl }, function (err, createdAccessory) {
        if (err) console.error(err);
        res.redirect('/');
    });
}

function getAttach(req, res, next) {
    let cubeId = req.params.id;
    let cubePromise = cubeModel.findById(cubeId);
    let accessoriesPromise = accessoryModel.find({ cubes: { $nin: cubeId } });

    Promise.all([cubePromise, accessoriesPromise]).then(([cube, accessories]) => {
        res.render('attachAccessory.hbs', { cube, accessories });
    }).catch(next);
}

function postAttach(req, res) {
    let cubeId = req.params.id;
    let accessoryId = req.body.accessory;
    
    Promise.all([
        cubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
        accessoryModel.updateOne({_id: accessoryId }, { $push: { cubes: cubeId } })
    ]).then(() => {
        res.redirect('/');
    });
}

module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
}