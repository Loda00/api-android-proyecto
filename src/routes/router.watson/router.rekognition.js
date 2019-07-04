const express = require('express')
const app = express()

const { visualRekognition } = require('../../watson/rekognition')

app.post('/rekognition', async (req, res) => {
    const { img } = req.files;
    let result
    try {
      result = await visualRekognition(img.path)
    } catch (error) {
      console.log(error);
    }
    return res.json({
      data: true,
      res: result,
    })
})
  
module.exports = app
