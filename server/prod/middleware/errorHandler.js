"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerFunction = errorHandlerFunction;
class ErrorHandler {
    erHandle(err, req, res) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            success: false,
            message: err.message
        });
    }
}
function errorHandlerFunction(err, req, res, next) {
    const er = new ErrorHandler();
    console.log('errrr');
    er.erHandle(err, req, res);
}
