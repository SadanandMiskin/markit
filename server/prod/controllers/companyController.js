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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = exports.googleLoginCompany = void 0;
const CompanyHandler_1 = require("../handlers/CompanyHandler");
const googleLoginCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idToken } = req.body;
    try {
        const { token, company } = yield CompanyHandler_1.CompanyHandler.googleLogin(idToken);
        res.status(200).json({
            token,
            company: {
                id: company.id,
                email: company.email,
                name: company.name
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.googleLoginCompany = googleLoginCompany;
const getCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield CompanyHandler_1.CompanyHandler.getCompanyDetails();
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
});
exports.getCompanies = getCompanies;
