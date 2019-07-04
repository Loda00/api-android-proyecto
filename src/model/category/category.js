const { Pool } = require('pg')
const { COMMIT, ROLLBACK } = require('../../utils/constants')
const { HOST, USERDB, DATABASE, PASSWORD, PORTDB } = process.env
const moment = require('moment')
const config = {
  host: HOST,
  user: USERDB,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB
}

class Category {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (!this.instance) {
      this.instance = new Pool(config)
    }
  }

  async getCategorys() {
    this.connection()

    const cli = await this.instance.connect()

    let data
    const sql = 'select * from category'

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


}

module.exports = {
  Category
}