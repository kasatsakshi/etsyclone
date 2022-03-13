import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Etsy backend server is running' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
