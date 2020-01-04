const path = require('path');
const log = require('debug')('SERVER');

if (process.env.NODE_ENV !== 'production') {
	// eslint-disable-next-line max-len
	// eslint-disable-next-line import/no-extraneous-dependencies, global-require, node/no-unpublished-require
	const result = require('dotenv').config({
		path: path.resolve(
			__dirname,
			'../config/environment',
			`${process.env.NODE_ENV}.env`
		)
	});

	if (process.env.NODE_ENV === 'development') {
		if (result.error) {
			throw result.error;
		}
		log(result.parsed);
	}
}

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const mkdirp = require('mkdirp');
const mongoose = require('mongoose');
const events = require('events');

const { handleError } = require('./lib/error');

const dbEventEmitter = new events.EventEmitter();
dbEventEmitter.on('connection', () => {
	const modelsFolder = path.join(__dirname, '../server/mongo/models');

	fs.readdirSync(modelsFolder).forEach(file => {
		// eslint-disable-next-line import/no-dynamic-require, global-require
		require(path.join(modelsFolder, file));
	});
	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line global-require
		require('../mocks/admin');
		// eslint-disable-next-line global-require
		require('../mocks/project');
	}
});

mongoose.connection
	.on('error', err => {
		log(err);
	})
	.on('connected', () => {
		dbEventEmitter.emit('connection');
	});

require('./mongo/connection');

const allRouters = require('./routes');

const app = express();

if (process.env.NODE_ENV === 'production') {
	// log all requests to access.log
	app.use(
		logger('common', {
			stream: fs.createWriteStream(
				path.resolve(process.cwd(), 'logs/access.log'),
				{
					flags: 'a'
				}
			)
		})
	);
	// create log folder
	mkdirp(path.join(process.cwd(), 'logs'), err => {
		if (err) {
			log(err);
		}
	});

	// bind STDOUT to file
	const access = fs.createWriteStream(
		path.join(process.cwd(), 'logs/logger.log')
	);
	// eslint-disable-next-line no-multi-assign
	process.stdout.write = process.stderr.write = access.write.bind(access);
} else if (process.env.NODE_ENV === 'development') {
	app.use(logger('dev'));
}

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(cookieParser());

app.use('/api', allRouters);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else {
	// eslint-disable-next-line max-len
	// eslint-disable-next-line import/no-extraneous-dependencies,global-require,node/no-unpublished-require
	const routeList = require('express-routes-catalogue');
	routeList.default.terminal(app);
}

app.use((err, req, res, next) => {
	handleError(err, res);
});

module.exports = app;
