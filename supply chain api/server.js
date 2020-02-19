'use strict'
require('module-alias/register')
const chalk = require('chalk');
const mongoose = require('mongoose')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const appConfig = require('./config/app.config')
const { composePromise } = require('@utils/common')
const cronJobs = require('@cronjobs/index')

const initModels = require('./config/model.config')
const initRoutes = require('./config/route.config')
const initCronJobs = require('./config/cronjobs.config')

const socket = require('@socket/index')

const connectDatabase = (url = appConfig.database.DATABASE_URL) => new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', (err) => reject(new Error(`MongoDb connection error: ${err.message}`)))
    db.once('open', resolve)
})

const connectSocket = (extra) => new Promise((resolve, reject) => {
    socket(io, extra)
    resolve()
})

const listen = (port) => new Promise((resolve, reject) => {
    http.listen(port, () => {
        console.log(chalk.green(`<${appConfig.app.NAME}>`) + chalk.yellow(`app is listening on: `) + chalk.red(`http://localhost:${port}`))
        resolve()
    })
})

composePromise(
    _ => listen(appConfig.app.PORT),
    cronJobs => connectSocket({ cronJobs }),
    _ => initCronJobs(cronJobs),
    _ => initRoutes(app),
    _ => initModels(appConfig),
    _ => connectDatabase()
)()
    .catch(err => {
        console.log(err.message)
    })

process.on('unhandledRejection', err => {
    console.log(err)
    console.error('Uncaught Error', err && err.message)
})
