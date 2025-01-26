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
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
class EmailService {
    draftEmail(companyId, product, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post("https://api.fireworks.ai/draft", {
                product,
                message,
            });
            const { subject, body } = response.data;
            const email = yield prisma.email.create({
                data: { subject, body, companyId },
            });
            return email;
        });
    }
    addCustomersFromCsv(companyId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = [];
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parse_1.parse)({ columns: true }))
                .on("data", (row) => customers.push({ email: row.email, companyId }))
                .on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield prisma.customer.createMany({ data: customers });
                fs_1.default.unlinkSync(filePath); // Cleanup
            }));
        });
    }
    sendEmail(companyId, emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield prisma.company.findUnique({ where: { id: companyId } });
            const email = yield prisma.email.findUnique({ where: { id: emailId } });
            const customers = yield prisma.customer.findMany({ where: { companyId } });
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            });
            for (const customer of customers) {
                yield transporter.sendMail({
                    from: `"${company.name}" <${process.env.EMAIL_USER}>`,
                    to: customer.email,
                    subject: email.subject,
                    text: email.body,
                });
            }
        });
    }
}
exports.default = EmailService;
