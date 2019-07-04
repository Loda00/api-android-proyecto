const { Pool } = require('pg')
const moment = require('moment')
const { COMMIT, ROLLBACK } = require('../../utils/constants')
const { HOST, USERDB, DATABASE, PASSWORD, PORTDB } = process.env

const config = {
  host: HOST,
  user: USERDB,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB
}

class Client {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (!this.instance) {
      this.instance = new Pool(config)
    }
  }

  async getClient(email) {
    this.connection()

    const cli = await this.instance.connect()

    let data
    const sql = `select cli.datecreate, cli.age, cli.state, cli.age, cli.state, cat.description, cli.email, cli.nick, cli.password
                 from client cli
                 INNER JOIN category cat ON
                 cli.idcategory = cat.id
                 where cli.email = '${email}'`

    try {
      
      data = await cli.query(sql)
      await cli.query(COMMIT)
    } catch (error) {
      console.error(error)
      await cli.query(ROLLBACK)
    } finally {
      cli.release()
    }

    return data
  }

  async addClient(firstname, lastname, photo, age, email, nick, password) {
    this.connection()

    const cli = await this.instance.connect()
    console.log('xxx', firstname, lastname, photo, age, email, nick, password, moment().format().toString())
    let data
    const sql = `insert into 
                 client(firstname, lastname, photo, dateCreate, age, state, idCategory, email, nick, password)
                 values('${firstname || ''}', '${lastname || ''}', '${photo || ''}', '${(moment().format().toString())}', ${age}, ${true}, ${1},' ${email}', '${nick}', '${password}')`
    console.log('sql', sql)
    try {
      data = await cli.query(sql)
      await cli.query(COMMIT)
    } catch (error) {
      await cli.query(ROLLBACK)
      console.error(error)
    } finally {
      cli.release()
    }
    return data
  }

}

module.exports = {
  Client
}