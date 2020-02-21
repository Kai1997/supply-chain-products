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
            ownable: "0x3B9b4873a7A3905226eB49443Ca1530d02702860",
            admin: "0x82B1AD4F680F94caF01774F8bB7EEE6A3f7e1B0F",
            farmer: "0xE83c9a3504350A3617cB322B54E7C477bD04CE0b",
            manu: "0x713140d0BDA6eBb4e109a831Cfef107c65F4CD69",
            distri: "0x8d1519587499e26cB9aF14Caa086d219Ee4dEB90",
            thirdpl: "0x3C2De641ede2EDe9c176e93F7ee3ab2a727dA257",
            retailer: "0xc5AE2F5891e58A5DAC2a990a8d6Bfe6d7B4Add1F",
            customer: "0x89F72e529490D4cc9C116d88356749c9F6259De3",
            main:"0x58F2231c5F758Af264a6F57dA3336008DA101c60"
        }
    }
}
