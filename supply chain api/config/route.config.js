module.exports = (app) => Promise.resolve(
    require('./express.config')(app)
)
