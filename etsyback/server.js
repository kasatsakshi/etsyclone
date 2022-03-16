import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";

const app = express();

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads')); 

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Etsy backend server is running' });
});

app.get('/public/uploads/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
