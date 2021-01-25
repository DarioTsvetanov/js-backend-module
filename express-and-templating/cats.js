let cats = [];

function add(name) {
    cats.push(name);
}

function getAll() {
    return cats.slice();
}

module.exports = {
    add,
    getAll
}