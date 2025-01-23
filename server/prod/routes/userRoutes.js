"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = require("../controllers/company");
const router = express_1.default.Router();
router.post('/getcompanyDetails', company_1.getCompanyDetails);
exports.default = router;
