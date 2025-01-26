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
const passport_google_oauth20_1 = require("passport-google-oauth20");
exports.default = (passport, prisma) => {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const email = profile.emails[0].value;
        let company = yield prisma.company.findUnique({ where: { email } });
        if (!company) {
            company = yield prisma.company.create({
                data: { email, name: profile.displayName },
            });
        }
        done(null, company);
    })));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield prisma.company.findUnique({ where: { id } });
        done(null, company);
    }));
};
