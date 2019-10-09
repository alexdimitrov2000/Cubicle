const mongoose = require('mongoose');

const cubeModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length >= 2;
            },
            message: props => `${props.value} should be at least 2 characters long.`
        }
    },
    description: String,
    imageUrl: String,
    difficultyLevel: Number
});

/*
 * accessible model property that is NOT persisted in the database
cubeModelSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
})
*/

module.exports = mongoose.model('Cube', cubeModelSchema)