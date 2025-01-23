import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient()

export const getCompanyDetails = async(req: Request, res: Response, next: NextFunction) => {
  const {name, email} = req.body
try {
  const company = {
    id: 1,
    name: name,
    description: email,
    type: "marketing"
  }
  const newUser = await prisma.company.create({
    data: company
  })
  console.log(newUser)
  res.json(newUser)
} catch (error) {
    console.log('ERRORORO ', error)
    next(error)
}
}