require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songsHandler = require('./api/songs');
const errorHandler = require('./api/errors');
const SongService = require('./services/postgres/SongService');
const songValidator = require('./validator/music');

const init = async () => {
	const songService = new SongService();
	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	await server.register({
		plugin: songsHandler,
		options: {
			service: songService,
			validator: songValidator,
		},
	});

	// plugin error handler
	await server.register({
		plugin: errorHandler,
	});

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
