const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

async function getAll(query) {
    let products = await Cube.find({}).lean();

    if (query.search) products = products.filter(x => x.name.toLowerCase().includes(query.search));

    if (query.from) products = products.filter(x => x.difficultyLevel >= Number(query.from));

    if (query.to) products = products.filter(x => x.difficultyLevel <= Number(query.to));

    return products;
}

function create(data, userId) {
    let cube = new Cube({...data, creator: userId});

    return cube.save();
}

function getOne(id) {
    return Cube.findById(id).lean(); 
}

function getOneWithAccessories(id) {
    return Cube.findById(id).populate('accessories').lean();
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);
    
    product.accessories.push(accessory);
    return product.save();
}

function edit(id, data) {
    return Cube.findByIdAndUpdate(id, data);
}

function remove(id) {
    return Cube.findByIdAndRemove(id, { useFindAndModify: false });
}

module.exports = {
    create,
    getAll,
    getOne,
    getOneWithAccessories,
    attachAccessory,
    edit,
    remove
};