"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const router = express_1.default.Router();
router.post('/logincompany', companyController_1.logincompany);
// router.post("/saveCompany", saveCompany);
router.get("/getCompanies", companyController_1.getCompanies);
exports.default = router;
