const express = require('express')
const { hashSync } = require('bcrypt')
const app = express.Router()


const { Client } = require('../../model/client/client')
app.post('/client', async (req, res) => {
  console.log('asdasd')
  const client = new Client()
  const { firstname, lastname, photo, age = 23, email = 'juan@live.com', nick = 'Loda', password = 'juan' } = req.body
  
  const passCrypt = hashSync(password, 10)
  console.log('passCrypt', passCrypt)

  let result
  try {
    result = await client.addClient(firstname, lastname, photo, age, email, nick ,passCrypt)
    console.log('result', result)
  } catch (error) {
    console.log(error);
  }

  if (!result) {
    return res.status(403).json({
      ok: false,
      error: 'Error the register'
    })
  }

  const data = {

  }

  return res.status(200).json({
    data: true,
    res: result,
  })
})

app.get('/client', (req, res) => {
  const client = new Client()
  const { email } = req.query
  console.log('mail', email)
  res.json({
    asda: true
  })
})

module.exports = app
