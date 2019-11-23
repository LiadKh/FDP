/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(process.env.MONGODB_URL, opts, (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log(`Error in DB connection: ${err}`);
    }
  });
};

const connect = mongoose.connect(process.env.MONGODB_URL, opts, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log(`Error in DB connection: ${err}`);
    setTimeout(connectWithRetry, 10000);
  }
});

module.exports = connect;
