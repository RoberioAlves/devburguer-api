module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger2',
    define: {
        timestamps:  true,
        underscore: true,
        underscoreAll: true,
    }
}