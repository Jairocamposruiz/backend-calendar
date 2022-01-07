const mongoose = require('mongoose');

const config = require('../config');

const dbConnection = async () => {
  try {
    await mongoose.connect(config.db.connection , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database online')

  } catch ( error ) {
    console.log(error);
    throw new Error('Error init database')
  }
}

module.exports = {
  dbConnection
};