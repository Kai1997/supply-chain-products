module.exports = (app) => Promise.resolve(
    require('@routes/express')(app)
)
