const path = require('path')
const modelNameList = require('@models/index')
const appConfig = require('./app.config')
module.exports = (options) => new Promise((resolve, reject) => {
    const models = modelNameList.map(
        modelName => require(path.resolve(appConfig.path.ROOT, `app/models/${modelName}`))
    )
    resolve(models)
})
