const COMMIT = 'COMMIT'
const ROLLBACK = 'ROLLBACK'
const { HOST, USERDB, DATABASE, PASSWORD, PORTDB } = process.env

const config = {
  host: HOST,
  user: USERDB,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB
}

module.exports = {
  COMMIT,
  ROLLBACK,
  config
}