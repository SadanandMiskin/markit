import express, { NextFunction, Request, Response } from 'express'
import { getCompanyDetails } from '../controllers/company'

const router = express.Router()

router.post('/getcompanyDetails' , getCompanyDetails)

export default router