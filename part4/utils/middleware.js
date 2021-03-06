const logger = require('./logger')
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired"
    })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
  return request.token
}

// const userExtractor = async (req, res, next) => {
//   const decodedToken = jwt.verify(req.token, process.env.SECRET)
//   if (!req.token || !decodedToken.id) {
//     return res.status(401).json({ error: 'token missing or invalid' }).end()
//   } else {
//     const user = await User.findById(decodedToken.id)
//     req.user = user
//   }
//   next()
//   return req.user
// }

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
