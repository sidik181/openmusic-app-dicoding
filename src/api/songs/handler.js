const autoBind = require('auto-bind');
const { successResponse } = require('../../utils/responses');

class SongsHandler {
	constructor(service, validator) {
		this._service = service;
		this._validator = validator;

		autoBind(this);
	}

	// handler menambahkan lagu
	async postSongHandler(request, h) {
		this._validator.validateSongPayload(request.payload);
		const {
			title = 'untitled',
			year,
			performer,
			genre,
			duration,
		} = request.payload;
		const newSongId = await this._service.addSong({
			title,
			year,
			performer,
			genre,
			duration,
		});

		return successResponse(h, {
			withMessage: true,
			withData: true,
			responseMessage: 'Lagu berhasil ditambahkan',
			responseData: {
				songId: newSongId,
			},
			responseCode: 201,
		});
	}

	// handler menampilkan semua lagu
	async getSongsHandler(request, h) {
		const songs = await this._service.getSongs();
		return successResponse(h, {
			withData: true,
			responseData: {
				songs,
			},
		});
	}

	// handler menampilkan detail lagu yang diambil dari request id
	async getSongByIdHandler(request, h) {
		const { songId } = request.params;
		const songById = await this._service.getSongById(songId);
		return successResponse(h, {
			withData: true,
			responseData: {
				song: songById,
			},
		});
	}

	// mengubah detail lagu dari request id
	async putSongByIdHandler(request, h) {
		this._validator.validateSongPayload(request.payload);
		const { songId } = request.params;
		await this._service.editSongById(songId, request.payload);
		return successResponse(h, {
			withMessage: true,
			responseMessage: 'Lagu berhasil diperbarui',
		});
	}

	// menghapus lagu dari request id
	async deleteSongByIdHandler(request, h) {
		const { songId } = request.params;
		await this._service.deleteSongById(songId);

		return successResponse(h, {
			withMessage: true,
			responseMessage: 'Lagu berhasil dihapus,',
		});
	}
}

module.exports = SongsHandler;
