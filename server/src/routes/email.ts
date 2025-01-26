import express from "express";
import multer from "multer";
import EmailService from "../services/emailService";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const emailService = new EmailService();

// Draft Email
router.post("/draft", async (req, res) => {
  const { companyId, product, message } = req.body;
  const email = await emailService.draftEmail(companyId, product, message);
  res.json(email);
});

// Upload Customers
router.post("/upload", upload.single("file"), async (req, res) => {
  const companyId = req.body.companyId;
  const filePath = req.file.path;
  await emailService.addCustomersFromCsv(companyId, filePath);
  res.sendStatus(200);
});

// Send Email
router.post("/send", async (req, res) => {
  const { companyId, emailId } = req.body;
  await emailService.sendEmail(companyId, emailId);
  res.sendStatus(200);
});

export default router;
