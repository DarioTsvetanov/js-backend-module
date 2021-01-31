const Cube = require('../models/cube');
const uniqid = require('uniqid');
const fs = require('fs');
let products = require('../config/products.json');
const path = require('path');

function getAll(query) {
    let result = products;

    if (query.search) result = result.filter(x => x.name.toLowerCase().includes(query.search));

    if (query.from) result = result.filter(x => x.difficultyLevel >= Number(query.from));

    if (query.to) result = result.filter(x => x.difficultyLevel <= Number(query.to));

    return result;
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );
    
    products.push(cube);

    return new Promise(function(resolve, reject) {
        fs.writeFile(path.join(__dirname, '../config/products.json'), 
        JSON.stringify(products), 
        err => err ? reject(err) : resolve());
    });
}

function getOne(id) {
    return products.find(obj => obj.id == id);
}

module.exports = {
    create,
    getAll,
    getOne
};