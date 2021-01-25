const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

// Declare a variable with the uri
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useUnifiedTopology: true });

// callback method

/* client.connect(err => {
    if (err) {
        return console.log(err);
    }

    // Connecting to an existing database
    let db = client.db('demoDatabase');
    let people = db.collection('people');

    people.find({}, (err, result) => {
        if (err) {
            return console.log(err);
        }

        // Convering all the entries into an array
        result.toArray((err, result) => {
            if (err) {
                return console.log(err);
            }

            console.log(result);
        });
    });
}); */

// Promise method

/* client.connect()
    .then(res => {
        let db = client.db('demoDatabase');
        let people = db.collection('people');

        return people.findOne({});
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    }) */

// Async/Await method
async function run() {
    await client.connect();

    let db = client.db('demoDatabase');
    let people = db.collection('people');

    let firstMan = await people.findOne({});
    console.log(firstMan);
}

run();