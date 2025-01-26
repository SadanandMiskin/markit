"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const emailService_1 = __importDefault(require("../services/emailService"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
const emailService = new emailService_1.default();
// Draft Email
router.post("/draft", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, product, message } = req.body;
    const email = yield emailService.draftEmail(companyId, product, message);
    res.json(email);
}));
// Upload Customers
router.post("/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = req.body.companyId;
    const filePath = req.file.path;
    yield emailService.addCustomersFromCsv(companyId, filePath);
    res.sendStatus(200);
}));
// Send Email
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, emailId } = req.body;
    yield emailService.sendEmail(companyId, emailId);
    res.sendStatus(200);
}));
exports.default = router;
