const express = require('express')
const { compareSync } = require('bcrypt')
const { isEmpty } = require('lodash')
const app = express()
const { Login } = require('../../model/login/login')


app.post('/login', async(req, res) => {
	const login = new Login()
	const { email, password } = req.body

	const data =  await login.login(email)

	if (isEmpty(data.rows)) {
		return res.status(403).json({
			status: 403,
			error: 'E-mail is wrong'
		})
	}

	const hash = data.rows[0].password
	const validPassword = compareSync(password, hash)

	if (!validPassword) {
		return res.status(403).json({
			state: 403,
			error: 'Password is wrong'
		})
	}

	delete data.rows[0].password

	res.json({
		ok: true,
		data: data.rows
	})
})

module.exports = app
