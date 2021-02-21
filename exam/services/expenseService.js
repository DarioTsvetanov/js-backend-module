// import expense model
const Expense = require('../models/Expense');

// import user model
const User = require('../models/User');

async function create(data, user) {
    let { merchant, total, category, description, report } = data;
    
    const err = {
        render: 'create',
        pageTitle: 'Create Expense'
    }

    // validate

    if (!merchant) throw { message: 'Merchant is required', render: err.render, pageTitle: err.pageTitle}
    if (!total) throw { message: 'Total is required', render: err.render, pageTitle: err.pageTitle}
    if (!category) throw { message: 'Category is required', render: err.render, pageTitle: err.pageTitle}
    if (!description) throw { message: 'Description is required', render: err.render, pageTitle: err.pageTitle}

    if (merchant.length < 4) throw { message: 'The merchant should be at least 4 characters long', render: err.render, pageTitle: err.pageTitle}
    if (description.length < 3 || description.length > 30) throw { message: 'Description length should be between 3 and 30 characters', render: err.render, pageTitle: err.pageTitle}
    if (isNaN(Number(total)) || Number(total) < 0) throw { message: 'The total should be a positive number', render: err.render, pageTitle: err.pageTitle}
    
    if (report) report = true;

    let expense = new Expense({ merchant, total, category, description, report, user });

    let existingUser = await User.findById(user);

    await User.findByIdAndUpdate(user, {expenses: [...existingUser.expenses,
        expense
    ]});

    return expense.save();
}

function getAll(userId) {
    return User.findById(userId).populate('expenses').lean();
}

function getOne(_id) {
    return Expense.find({_id}).lean();
}

function remove(expenseId) {
    return Expense.findByIdAndDelete(expenseId);
}

async function refillAmount(userId, amount) {
    try {
        if (isNaN(Number(amount)) || amount < 1) return;

        const user = await User.findById(userId);
        amount = Number(amount) + Number(user.amount);

        return User.findByIdAndUpdate(userId, {amount});
    }
    catch(e) {
        throw e;
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    remove,
    refillAmount
}