const healthCheckRouter = require('express').Router()

healthCheckRouter.get('/', async (request, response) => {
  response.send('ok')
})

module.exports = healthCheckRouter
