'use strict'

require('module-alias/register')
require('dotenv').config('@.env')

const fs = require('fs')
const shell = require('shelljs')
const appConfig = require('../../config/app.config')

console.log(appConfig.path.ROOT);

const run = async () => {
    try {
        let dbFolder = `${appConfig.path.ROOT}/database/backups/db-backups/${appConfig.database.DATABASE_NAME}`
        if (fs.existsSync(dbFolder)) {
            await shell.exec(
                `bash ${appConfig.path.ROOT}/database/backups/restore.sh ${appConfig.database.DATABASE_URL} ${dbFolder} ${appConfig.database.DATABASE_NAME}`
            )
        } else throw new Error('db-backup not exists')
    } catch (er) {
        console.log(er.message)
    }
}

run()
