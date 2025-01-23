"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middleware/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.get('/s', (req, res) => {
    res.json("hello");
});
app.use('/api', userRoutes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandlerFunction)(err, req, res, next);
});
app.listen(3000, () => {
    console.log('Server listening');
});
