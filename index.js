const express = require('express')
const multipart = require('connect-multiparty')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
const { PORT } = process.env

  
const app = express()

app.use(cors())
// app.use(app.router)
app.use(helmet())
app.use(morgan('dev'))
app.use(multipart())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.json({
    server: true,
    data: null,
  })
})

// Routes
// app.use('/api', require('./src/routes/index'))
app.use('/api', require('./src/controller/category/category'))
app.use('/api', require('./src/controller/texture/texture'))
app.use('/api', require('./src/controller/client/client'))
app.use('/api', require('./src/controller/login/login'))
app.use('/watson', require('./src/routes/router.watson/router.rekognition'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})