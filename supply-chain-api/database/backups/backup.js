'use strict'

require('module-alias/register')
require('dotenv').config('@.env')
const appConfig = require('../../config/app.config')

const moment = require('moment')
const shell = require('shelljs')

const run = async () => {
    try {
        let time = moment().format('DD-MM-YY-HH:mm')
        let filename = appConfig.database.DATABASE_NAME + '_' + time
        await shell.exec(
            `bash ${PATH.ROOT}/database/backups/backup.sh ${appConfig.database.DATABASE_URL} ${filename}`
        )
    } catch (err) {
    }
}

run()
