const log = require('debug')('MOCK');
const User = require('../mongo/models/user');

const admin = {
  name: {
    first: 'admin',
    last: 'admin',
  },
  email: 'admin@admin.com',
  password: '123',
  isAdmin: true,
};

User.create(admin).then((user) => log(`admin has been created ${user}`)).catch((err) => log(`mock admin problem ${err}`));
