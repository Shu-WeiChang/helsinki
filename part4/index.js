const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
