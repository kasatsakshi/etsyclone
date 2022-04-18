import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import config from './config';
// import passport from './helpers/passport';

const app = express();
const corsOptions = { origin: '*', exposedHeaders: 'X-Auth-Token' };

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

app.get('/public/shop/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

app.get('/public/products/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

// Connect to MongoDB
mongoose
  .connect(config.mongo.uri, config.mongo.connectionOptions)
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
