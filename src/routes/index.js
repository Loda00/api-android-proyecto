const express = require('express')
const app = express()

const Reckognition = require('./router.watson/router.rekognition')
const Category = require('./category/category')



module.exports = {
  Reckognition,
  Category
}
