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


/*
const mongodb = require('mongodb');
const { MongoClient } = mongodb;
const connectionString = 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

client.connect(function(err) {
    const db = client.db('test');
    const usersCollection = db.collection('users');

    usersCollection.insert({ name: 'Gosho', age: 23, hobbies: ['programming', 'swimming'] }, (err, result) => {
        usersCollection.findOne({ name: 'Gosho' }).then(user => {
            console.log(user._id + ' ' + user.name);
        }) 
    });

    usersCollection.deleteOne({ name: 'Gosho' }).then(console.log)
})
*/