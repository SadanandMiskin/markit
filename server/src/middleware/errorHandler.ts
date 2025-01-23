import { NextFunction, Request, Response } from "express";


interface ERROR{
  message: 'Error'
}

class ErrorHandler {

  public erHandle(err: Error, req: Request, res: Response) {
    const statusCode = (err as any).status || 500
    res.status(statusCode).json({
      success: false,
      message: err.message
    })
  }


}


export function errorHandlerFunction(err: Error, req: Request, res: Response, next: NextFunction){
  const er = new ErrorHandler()
  console.log('errrr')
  er.erHandle(err, req, res)
}