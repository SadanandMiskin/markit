import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default (passport: any, prisma: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let company = await prisma.company.findUnique({ where: { email } });
        if (!company) {
          company = await prisma.company.create({
            data: { email, name: profile.displayName },
          });
        }
        done(null, company);
      }
    )
  );

  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser(async (id: any, done: any) => {
    const company = await prisma.company.findUnique({ where: { id } });
    done(null, company);
  });
};
