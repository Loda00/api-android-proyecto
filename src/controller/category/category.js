const express = require('express')
const app = express.Router()

const { Category } = require('../../model/category/category')

app.get('/category', async (req, res) => {
  const category = new Category()
    let result
    try {
      result = await category.getCategorys()
    } catch (error) {
      console.log(error);
    }
    return res.json({
      data: true,
      res: result,
    })
})

module.exports = app
