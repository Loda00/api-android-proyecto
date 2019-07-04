const { Pool } = require('pg')
const { COMMIT, ROLLBACK } = require('../../utils/constants')
const { HOST, USERDB, DATABASE, PASSWORD, PORTDB } = process.env

const config = {
  host: HOST,
  user: USERDB,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB
}

class Texture {
  constructor() {
    this.instance = undefined
  }

  connection() {
    if (!this.instance) {
      this.instance = new Pool(config)
    }
  }

  async getTextures() {
    this.connection()

    const cli = await this.instance.connect()

    let data
    const sql = 'select * from texture'

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
  Texture
}