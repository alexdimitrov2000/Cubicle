const mongoose = require('mongoose');

const accessoryModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(https|http):\/\/.+$/.test(value);
            },
            message: props => `${props.value} should start either with 'https' or with 'http'.`
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length <= 70;
            },
            message: props => `${props.value} should be maximum 70 characters long.`
        }
    },
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }]    
});

module.exports = mongoose.model('Accessories', accessoryModelSchema);