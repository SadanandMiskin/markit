import express, { type Response, type Request, NextFunction } from 'express';
import path from 'path';
import { errorHandlerFunction } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes'
import fs from 'fs'
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")))


app.get('/s', (req: Request, res: Response) => {
  res.json("hello");
});
app.use('/api' , userRoutes)


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
});

app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
  errorHandlerFunction(err, req, res, next)
})

app.listen(3000, () => {
  console.log('Server listening');
});