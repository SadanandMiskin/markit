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
exports.CompanyHandler = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const prisma = new client_1.PrismaClient();
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class CompanyHandler {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    static googleLogin(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify Google ID token
                const ticket = yield googleClient.verifyIdToken({
                    idToken: idToken,
                    audience: process.env.GOOGLE_CLIENT_ID
                });
                const payload = ticket.getPayload();
                const email = payload === null || payload === void 0 ? void 0 : payload.email;
                if (!email) {
                    throw new Error('No email found in Google token');
                }
                // Check if company exists, if not create
                let company = yield prisma.company.findUnique({
                    where: { email }
                });
                if (!company) {
                    company = yield prisma.company.create({
                        data: {
                            email,
                            name: payload === null || payload === void 0 ? void 0 : payload.name,
                            description: '',
                            type: ''
                        }
                    });
                }
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({
                    email,
                    companyId: company.id
                }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
                return { token, company };
            }
            catch (error) {
                console.error('Google login error:', error);
                throw error;
            }
        });
    }
    static getCompanyDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.company.findMany();
        });
    }
}
exports.CompanyHandler = CompanyHandler;
