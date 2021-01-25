const mongoose = require('mongoose');
const Person = require('./modules/Person.js');

const uri = 'mongodb://localhost:27017/demoDatabase';

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

let person = new Person({name: 'Gumbol', age: 12});

// create a new person in the database
/* person.save()
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err)) */

    
// display all the people in the database with their virtual property birthYear
/* Person.find({})
    .then(people => {
        people.forEach(x => console.log(`${x.name} is born in ${x.birthYear}`));
    });  */

// display a person matching the given id
/* Person.findById('600e939625ac552424d1d1bb')
    .then(res => {
        console.log(res);
    }); */

// update a specific property of a person matched by a specific criteria
/* Person.updateOne({_id: '600efecd91b8941b4ce123de'}, {$set: { name: 'Divan' }})
    .then(res => {
        console.log(res);
    }); */

// Manually update a document
/* Person.findById('600e88f75fdbf340864ad43a')
    .then(person => {
        person.name = 'Misho';
        person.save();
    }) */

// delete a document matched by a specific criteria; don't use remove, it is deprecated
/* Person.remove({ name: 'Divan' })
    .then(res => console.log(res)); */ 

// Showing only the needed properties
/* Person.find({}, { _id: 0, name: 1 })
    .then(res => console.log(res)); */

// sorting the documents by a criteria
/* Person.find({}).sort({age: -1})
    .then(res => console.log(res)); */