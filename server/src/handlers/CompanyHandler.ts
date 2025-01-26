import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class CompanyHandler {
  private name: string;
  private description: string;
  private type: string;

  constructor(name: string, description: string, type: string) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  public static async googleLogin(idToken: string) {
    try {
      // Verify Google ID token
      const ticket = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      const email = payload?.email;

      if (!email) {
        throw new Error('No email found in Google token');
      }

      // Check if company exists, if not create
      let company = await prisma.company.findUnique({
        where: { email }
      });

      if (!company) {
        company = await prisma.company.create({
          data: {
            email,
            name: payload?.name,
            description: '',
            type: ''

          }
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          email,
          companyId: company.id
        },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1h' }
      );

      return { token, company };

    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  public static async getCompanyDetails() {
    return prisma.company.findMany();
  }
}