import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { parse } from "csv-parse";
import fs from "fs";
import axios from "axios";

const prisma = new PrismaClient();

class EmailService {
  async draftEmail(companyId: string, product: string, message: string) {
    const response = await axios.post("https://api.fireworks.ai/draft", {
      product,
      message,
    });
    const { subject, body } = response.data;

    const email = await prisma.email.create({
      data: { subject, body, companyId },
    });

    return email;
  }

  async addCustomersFromCsv(companyId: string, filePath: string) {
    const customers: any[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on("data", (row) => customers.push({ email: row.email, companyId }))
      .on("end", async () => {
        await prisma.customer.createMany({ data: customers });
        fs.unlinkSync(filePath); // Cleanup
      });
  }

  async sendEmail(companyId: string, emailId: string) {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    const email = await prisma.email.findUnique({ where: { id: emailId } });
    const customers = await prisma.customer.findMany({ where: { companyId } });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    for (const customer of customers) {
      await transporter.sendMail({
        from: `"${company.name}" <${process.env.EMAIL_USER}>`,
        to: customer.email,
        subject: email.subject,
        text: email.body,
      });
    }
  }
}

export default EmailService;
