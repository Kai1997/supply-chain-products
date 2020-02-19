const appConfig = require('./app.config')

module.exports = (cronJobs) => new Promise((resolve, reject) => {
    try {
        if (appConfig.env.NODE_ENV === 'production') {
            Object.values(cronJobs).map(job => job().start())
            resolve(cronJobs)
        } else resolve(null)
    } catch (err) {
        reject(err)
    }
})
