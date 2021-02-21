const config = {
    PORT: 5000,
    DB_CONNECTION: `mongodb://localhost/e`,
    SECRET: 'back-end_exam',
    SALT_ROUNDS: 5,
    COOKIE_NAME: 'token'
};

module.exports = config;