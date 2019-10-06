const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;

const cubeModel = require('./models/cube');

console.log("STARTED");

// cubeModel.insert({ 
//     name: 'Gan356 Air SM', 
//     description: 'Magnets in AirSM will not drop, and their positions will be more precise with the Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more comfortable. P.S. This design is brand new for the AirSM.', 
//     imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
//     difficultyLevel: 3
// }).then(insertedCube => console.log(insertedCube));

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

const port = config.port;

console.log(`Current number of cubes: ${cubeModel.data.entities.length}`)

app.listen(port, console.log(`Listening on port ${port}! Now its up to you...`));