import express, { type Response, type Request } from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Define more specific routes first
app.get('/s', (req: Request, res: Response) => {
  res.json("hello");
});

// Define less specific routes later
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(3000, () => {
  console.log('Server listening');
});