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
exports.getCompanyDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCompanyDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const company = {
            id: 1,
            name: name,
            description: email,
            type: "marketing"
        };
        const newUser = yield prisma.company.create({
            data: company
        });
        console.log(newUser);
        res.json(newUser);
    }
    catch (error) {
        console.log('ERRORORO ', error);
        next(error);
    }
});
exports.getCompanyDetails = getCompanyDetails;
