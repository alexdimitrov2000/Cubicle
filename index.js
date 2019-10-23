global.__basedir = __dirname;

const databaseConnector = require('./config/database');
databaseConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    const port = config.port;

    console.log("STARTED");

    app.listen(port, console.log(`Listening on port ${port}! Now its up to you...`));
}).catch(console.error);