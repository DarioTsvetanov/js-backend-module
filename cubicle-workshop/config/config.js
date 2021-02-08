const config = {
    development: {
        PORT: 5000,
        SALT_ROUNDS: 2,
        PRIVATE_KEY: 'cubicledemo'
    },
    production: {
        PORT: 80
    }
}

module.exports = config[process.env.NODE_ENV.trim()];