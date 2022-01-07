const express = require('express');
const cors = require('cors');

const config = require('../config');
const { dbConnection } = require('../database/config');
const authRouter = require('../routers/authRouter');
const eventRouter = require('../routers/eventsRouter');
const { boomErrorHandler, errorHandler, jsonErrorHandler } = require('../middlewares/errorHandlers');


class Server {

  constructor() {
    this.app = express();
    this.port = config.app.port;

    this.paths = {
      auth: '/api/auth',
      event: '/api/events'
    };

    this.connectDB();
    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.event, eventRouter);
  }

  errorHandlers() {
    this.app.use(boomErrorHandler);
    this.app.use(jsonErrorHandler);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running in http://localhost:${ this.port }`);
    });
  }
}

module.exports = Server;
