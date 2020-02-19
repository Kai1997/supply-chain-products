const path = require('path')
module.exports = {
    app: {
        PORT: process.env.PORT || 4000,
        NAME: 'API SC'
    },
    auth: {
        HASH_PASSWORD: 10
    },
    cors: {
        'origin': '*',
        'methods': 'GET,PUT,PATCH,POST,DELETE',
        'preflightContinue': false,
        'optionsSuccessStatus': 200
    },
    database: {
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_URL: (process.env.DATABASE_URL)?(process.env.DATABASE_URL):("mongodb://localhost:27017/apisc")
    },
    env: {
        NODE_ENV: process.env.NODE_ENV || 'development'
    },
    jwt: {
        JWT_EXPIRATION: 10000,
        JWT_ENCRYPTION: 'jwt-nodejs-temp-mvc-$--$$$$--$',
        JWT_TOKEN_PREFIX: 'Bearer'
    },
    mail: {
        DRIVER: process.env.MAIL_DRIVER,
        HOST: process.env.MAIL_HOST,
        PORT: process.env.MAIL_PORT,
        USERNAME: process.env.MAIL_USERNAME,
        PASSWORD: process.env.MAIL_PASSWORD,
        ENCRYPTION: process.env.MAIL_ENCRYPTION
    },
    path: {
        ROOT: path.resolve(__dirname, '../'),
        ADMIN_PREFIX: '/admin'
    },
    session:{
        secret: 'session-secret-!##!',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    },
    socket:{},
    view:{}
}
