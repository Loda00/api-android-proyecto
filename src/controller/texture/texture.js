const express = require('express')
const app = express.Router()

const { Texture } = require('../../model/texture/texture')

app.get('/texture', async (req, res) => {
  const texture = new Texture()
    let result
    try {
      result = await texture.getTextures()
    } catch (error) {
      console.log(error);
    }
    return res.json({
      data: true,
      res: result,
    })
})

module.exports = app
