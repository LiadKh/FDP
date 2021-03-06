const log = require('debug')('MOCK');
const User = require('../server/mongo/models/user');

const admin = {
	name: {
		first: 'admin',
		last: 'admin'
	},
	email: 'admin@admin.com',
	password: 'admin',
	isAdmin: true
};

User.create(admin)
	.then(user => log(`admin has created ${user}`))
	.catch(err => log(`mock admin problem ${err}`));
