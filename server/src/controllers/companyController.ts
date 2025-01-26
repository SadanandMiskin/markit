import { Request, Response, NextFunction } from "express";
import { CompanyHandler } from "../handlers/CompanyHandler";

export const googleLoginCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { idToken } = req.body;

  try {
    const { token, company } = await CompanyHandler.googleLogin(idToken);
    res.status(200).json({
      token,
      company: {
        id: company.id,
        email: company.email,
        name: company.name
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await CompanyHandler.getCompanyDetails();
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};