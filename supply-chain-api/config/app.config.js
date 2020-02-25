const path = require('path')
require('dotenv').config('@.env')
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
    view:{},
    infura: {
        key: process.env.INFURA_KEY,
        url: 'https://ropsten.infura.io/v3/' + process.env.INFURA_KEY
    },
    networks: {
        "etc": {
			"id": 0,
			"url": "https://mew.epool.io",
		},
		"mainnet": {
			"id": 1,
			"url": "https://mainnet.infura.io/v3/",
		},
		"ropsten": {
			"id": 3,
			"url": "https://ropsten.infura.io/v3/",
		},
		"rinkeby": {
			"id": 4,
			"url": "https://rinkeby.infura.io/v3/",
		},
		"testnet": {
			"id": 1337,
			"url": "http://127.0.0.1:8545",
		},
		"kovan": {
			"id": 42,
			"url": "https://kovan.infura.io/v3/",
		},
    },
    contract: {
        gasPrice: 10000000000,
        account: process.env.DEFAULT_ACCOUNT,
        address: {
            ownable: process.env.ownable,
            admin: process.env.admin,
            farmer: process.env.farmer,
            manu: process.env.manu,
            distri: process.env.distri,
            thirdpl: process.env.thirdpl,
            retailer: process.env.retailer,
            customer: process.env.customer,
            main:process.env.main
        }
    }
}
