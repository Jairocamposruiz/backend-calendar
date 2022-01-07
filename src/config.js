require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT,
    secretJwt: process.env.SECRET_JWT,
  },
  db: {
    connection: process.env.DB_CONNECTION
  }
}

module.exports = config;