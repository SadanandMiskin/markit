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
exports.CompanyController = CompanyController;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CompanyHandler {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    savCompanyDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield prisma.company.create({
                    data: {
                        name: this.name,
                        description: this.description,
                        type: this.type
                    }
                });
                res.status(200).json(newUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
function CompanyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, type } = req.body;
        const company = new CompanyHandler(name, description, type);
        yield company.savCompanyDetails(req, res, next);
    });
}
