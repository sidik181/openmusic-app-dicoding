/* eslint-disable class-methods-use-this */
const ClientError = require('../../exceptions/ClientError');
const { failResponse, errorResponse } = require('../../utils/responses');

class ErrorHandler {
	errorHandler(request, h) {
		const { response } = request;

		// pengecekan error sesuai dengan error handling
		if (response instanceof ClientError) {
			return failResponse(h, response);
		} if (response instanceof Error) {
			return errorResponse(h, response);
		}

		// jika bukan error client diteruskan ke respon sebelumnya
		return response.continue || response;
	}
}
module.exports = ErrorHandler;
