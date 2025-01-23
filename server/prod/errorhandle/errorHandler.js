"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerFunction = errorHandlerFunction;
class errorHandler {
    erHandle(err, req, res) {
        console.error(err);
        res.json({
            success: false,
            message: err.message
        });
        return;
    }
}
function errorHandlerFunction(err, req, res, next) {
    const er = new errorHandler();
    er.erHandle(err, req, res);
}
